import React, { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Input, Button, Tabs, Space, Card, List, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  value: string;
  onChange: (val: string) => void;
  team: string; // [3. new added configs template not reflect current team]
}

interface Directive {
  key: string;
  value: string;
}

interface Location {
  path: string;
  directives: Directive[];
}

interface Upstream {
  name: string;
  servers: string[];
}

export const ConfigEditor: React.FC<Props> = ({ value, onChange, team }) => {
  const [mode, setMode] = useState<"raw" | "wizard">("wizard");
  const [locations, setLocations] = useState<Location[]>([]);
  const [upstreams, setUpstreams] = useState<Upstream[]>([]); // [1. No upsteams configs]
  const monaco = useMonaco();

  // [4. add syntax highlight for raw editor]
  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "nginx" });
      monaco.languages.setMonarchTokensProvider("nginx", {
        tokenizer: {
          root: [
            [/server\s+/, "keyword"],
            [/upstream\s+/, "keyword"],
            [/location\s+/, "keyword"],
            [/proxy_pass\s+/, "keyword"],
            [/include\s+/, "keyword"],
            [/rewrite\s+/, "keyword"],
            [/proxy_set_header\s+/, "keyword"],
            [/[a-z_]+/, "identifier"],
            [/\$/, "variable"],
            [/[{}]/, "delimiter"],
            [/#.*/, "comment"],
          ],
        },
      });
    }
  }, [monaco]);

  // Sync Logic
  // Text -> Form
  useEffect(() => {
    if (mode === "wizard") {
      const { locs, upstrs } = parseConfig(value);
      setLocations(locs);
      setUpstreams(upstrs);
    }
  }, [value, mode]);

  const updateFromForm = (
    newLocations: Location[],
    newUpstreams: Upstream[]
  ) => {
    setLocations(newLocations);
    setUpstreams(newUpstreams);
    const newText = generateConfig(newLocations, newUpstreams);
    onChange(newText);
  };

  const handleEditorChange = (val: string | undefined) => {
    onChange(val || "");
  };

  // [2. support nginx proxy functions]
  const addDirective = (locIdx: number) => {
    const newLocs = [...locations];
    newLocs[locIdx].directives.push({
      key: "proxy_set_header",
      value: "Host $host",
    });
    updateFromForm(newLocs, upstreams);
  };

  const updateDirective = (
    locIdx: number,
    dirIdx: number,
    key: string,
    val: string
  ) => {
    const newLocs = [...locations];
    newLocs[locIdx].directives[dirIdx] = { key, value: val };
    updateFromForm(newLocs, upstreams);
  };

  const removeDirective = (locIdx: number, dirIdx: number) => {
    const newLocs = [...locations];
    newLocs[locIdx].directives = newLocs[locIdx].directives.filter(
      (_, i) => i !== dirIdx
    );
    updateFromForm(newLocs, upstreams);
  };

  return (
    <Card
      title="Configuration Editor"
      extra={
        <Tabs
          activeKey={mode}
          onChange={(k) => setMode(k as "raw" | "wizard")}
          items={[
            { key: "wizard", label: "Wizard Mode" },
            { key: "raw", label: "Raw Config" },
          ]}
        />
      }
    >
      {mode === "raw" ? (
        <Editor
          height="600px"
          language="nginx" // Use the ID we registered
          value={value}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      ) : (
        <div style={{ minHeight: 400 }}>
          <Typography.Title level={5}>Upstreams</Typography.Title>
          {upstreams.map((u, idx) => (
            <Card key={idx} size="small" style={{ marginBottom: 8 }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input
                  addonBefore="Upstream Name"
                  value={u.name}
                  onChange={(e) => {
                    const newUps = [...upstreams];
                    newUps[idx].name = e.target.value;
                    updateFromForm(locations, newUps);
                  }}
                />
                <Input.TextArea
                  rows={2}
                  value={u.servers.join("\n")}
                  onChange={(e) => {
                    const newUps = [...upstreams];
                    newUps[idx].servers = e.target.value.split("\n");
                    updateFromForm(locations, newUps);
                  }}
                  placeholder="server 10.0.0.1:8080;"
                />
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    const newUps = upstreams.filter((_, i) => i !== idx);
                    updateFromForm(locations, newUps);
                  }}
                >
                  Remove Upstream
                </Button>
              </Space>
            </Card>
          ))}
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => {
              updateFromForm(locations, [
                ...upstreams,
                { name: `${team}_backend`, servers: ["127.0.0.1:3000"] },
              ]);
            }}
            block
            style={{ marginBottom: 24 }}
          >
            Add Upstream
          </Button>

          <Typography.Title level={5}>Locations</Typography.Title>
          {locations.map((loc, idx) => (
            <Card key={idx} size="small" style={{ marginBottom: 8 }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input
                  addonBefore="Location Path"
                  value={loc.path}
                  onChange={(e) => {
                    const newLocs = [...locations];
                    newLocs[idx].path = e.target.value;
                    updateFromForm(newLocs, upstreams);
                  }}
                />

                <List
                  size="small"
                  header={<div>Directives</div>}
                  bordered
                  dataSource={loc.directives}
                  renderItem={(item, dIdx) => (
                    <List.Item>
                      <Space>
                        <Input
                          value={item.key}
                          onChange={(e) =>
                            updateDirective(
                              idx,
                              dIdx,
                              e.target.value,
                              item.value
                            )
                          }
                          style={{ width: 150 }}
                        />
                        <Input
                          value={item.value}
                          onChange={(e) =>
                            updateDirective(idx, dIdx, item.key, e.target.value)
                          }
                          style={{ width: 300 }}
                        />
                        <Button
                          icon={<DeleteOutlined />}
                          danger
                          size="small"
                          onClick={() => removeDirective(idx, dIdx)}
                        />
                      </Space>
                    </List.Item>
                  )}
                />
                <Button
                  type="dashed"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => addDirective(idx)}
                >
                  Add Directive
                </Button>

                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => {
                    const newLocs = locations.filter((_, i) => i !== idx);
                    updateFromForm(newLocs, upstreams);
                  }}
                  style={{ marginTop: 8 }}
                >
                  Remove Location
                </Button>
              </Space>
            </Card>
          ))}
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => {
              // [3. new added configs template not reflect current team]
              updateFromForm(
                [
                  ...locations,
                  {
                    path: `/api/${team}/new`,
                    directives: [
                      { key: "proxy_pass", value: `http://${team}_backend` },
                    ],
                  },
                ],
                upstreams
              );
            }}
            block
            style={{ marginTop: 16 }}
          >
            Add Location Block
          </Button>
        </div>
      )}
    </Card>
  );
};

// --- Helpers ---
function parseConfig(text: string): { locs: Location[]; upstrs: Upstream[] } {
  const locs: Location[] = [];
  const upstrs: Upstream[] = [];

  // Parse Upstreams
  const upstreamRegex = /upstream\s+([^{]+)\s*{([^}]*)}/g;
  let match;
  while ((match = upstreamRegex.exec(text)) !== null) {
    const name = match[1].trim();
    const body = match[2].trim();
    const servers = body
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.startsWith("server"))
      .map((s) => s.replace("server", "").trim());
    upstrs.push({ name, servers });
  }

  // Parse Locations (Simplified)
  const locRegex = /location\s+([^{]+)\s*{([^}]*)}/g;
  while ((match = locRegex.exec(text)) !== null) {
    const path = match[1].trim();
    const body = match[2].trim();
    const lines = body
      .split(";")
      .map((l) => l.trim())
      .filter((l) => l);
    const directives: Directive[] = [];
    for (const line of lines) {
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        const k = parts[0];
        const v = parts.slice(1).join(" ");
        directives.push({ key: k, value: v });
      }
    }
    locs.push({ path, directives });
  }

  return { locs, upstrs };
}

function generateConfig(locs: Location[], upstrs: Upstream[]): string {
  const upstreamBlock = upstrs
    .map(
      (u) =>
        `upstream ${u.name} {\n${u.servers.map((s) => `    server ${s};`).join("\n")}\n}`
    )
    .join("\n\n");
  const locationBlock = locs
    .map(
      (l) =>
        `location ${l.path} {\n${l.directives.map((d) => `    ${d.key} ${d.value};`).join("\n")}\n}`
    )
    .join("\n\n");

  if (upstreamBlock && locationBlock)
    return `${upstreamBlock}\n\n${locationBlock}`;
  if (upstreamBlock) return upstreamBlock;
  return locationBlock;
}
