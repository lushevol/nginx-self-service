import subprocess
import tempfile
import textwrap
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).with_name("check_location_overlap.py")


class CheckLocationOverlapTests(unittest.TestCase):
    def run_helper(self, config_text: str) -> subprocess.CompletedProcess[str]:
        with tempfile.NamedTemporaryFile("w", suffix=".conf", delete=False) as handle:
            handle.write(textwrap.dedent(config_text))
            config_path = Path(handle.name)

        self.addCleanup(config_path.unlink)

        return subprocess.run(
            ["python3", str(SCRIPT_PATH), str(config_path)],
            check=False,
            capture_output=True,
            text=True,
        )

    def test_duplicate_prefix_in_same_server_blocks_release(self) -> None:
        result = self.run_helper(
            """
            server {
                location /api {
                }
                location /api {
                }
            }
            """
        )

        self.assertEqual(result.returncode, 1)
        self.assertIn("blocking-candidate: duplicate prefix location path", result.stdout)

    def test_prefix_overlap_is_review_needed(self) -> None:
        result = self.run_helper(
            """
            server {
                location /foo {
                }
                location /foobar {
                }
            }
            """
        )

        self.assertEqual(result.returncode, 0)
        self.assertIn("review-needed: prefix overlap", result.stdout)

    def test_exact_and_prefix_same_matcher_is_review_needed(self) -> None:
        result = self.run_helper(
            """
            server {
                location = /health {
                }
                location /health {
                }
            }
            """
        )

        self.assertEqual(result.returncode, 0)
        self.assertIn("review-needed: exact location shares the same matcher as a prefix location", result.stdout)

    def test_same_path_different_prefix_modifiers_is_review_needed(self) -> None:
        result = self.run_helper(
            """
            server {
                location ^~ /static {
                }
                location /static {
                }
            }
            """
        )

        self.assertEqual(result.returncode, 0)
        self.assertIn("review-needed: same prefix path uses different location modifiers", result.stdout)

    def test_duplicate_locations_in_different_servers_do_not_conflict(self) -> None:
        result = self.run_helper(
            """
            server {
                listen 80;
                location / {
                }
            }

            server {
                listen 81;
                location / {
                }
            }
            """
        )

        self.assertEqual(result.returncode, 0)
        self.assertIn("No exact duplicates or prefix overlaps found.", result.stdout)

    def test_regex_locations_are_reported_for_human_review_only(self) -> None:
        result = self.run_helper(
            """
            server {
                location ~ ^/foo/[0-9]{2}$ {
                }
                location /foo/bar {
                }
            }
            """
        )

        self.assertEqual(result.returncode, 0)
        self.assertIn("regex-review-needed:", result.stdout)
        self.assertIn("^/foo/[0-9]{2}$", result.stdout)


if __name__ == "__main__":
    unittest.main()