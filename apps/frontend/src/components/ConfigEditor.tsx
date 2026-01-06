import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Input, Button, Tabs, Space, Card } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

interface Location {
  path: string;
  proxyPass: string;
}

export const ConfigEditor: React.FC<Props> = ({ value, onChange }) => {
  const [mode, setMode] = useState<"raw" | "wizard">("wizard");
  const [locations, setLocations] = useState<Location[]>([]);

  // Simple Sync Logic
  // Text -> Form
  useEffect(() => {
    if (mode === "wizard") {
      const parsed = parseConfig(value);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocations(parsed);
    }
  }, [value, mode]);

  // Form -> Text
  const updateFromForm = (newLocations: Location[]) => {
    setLocations(newLocations);
    const newText = generateConfig(newLocations);
    onChange(newText);
  };

  const handleEditorChange = (val: string | undefined) => {
    onChange(val || "");
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
          height="400px"
          defaultLanguage="nginx"
          value={value}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      ) : (
        <div style={{ minHeight: 400 }}>
          {locations.map((loc, idx) => (
            <Card key={idx} size="small" style={{ marginBottom: 8 }}>
              <Space>
                <Input
                  addonBefore="Location Path"
                  value={loc.path}
                  onChange={(e) => {
                    const newLocs = [...locations];
                    newLocs[idx].path = e.target.value;
                    updateFromForm(newLocs);
                  }}
                  style={{ width: 300 }}
                />

                <Input
                  addonBefore="Proxy Pass"
                  value={loc.proxyPass}
                  onChange={(e) => {
                    const newLocs = [...locations];
                    newLocs[idx].proxyPass = e.target.value;
                    updateFromForm(newLocs);
                  }}
                  style={{ width: 300 }}
                />

                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => {
                    const newLocs = locations.filter((_, i) => i !== idx);
                    updateFromForm(newLocs);
                  }}
                />
              </Space>
            </Card>
          ))}
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => {
              updateFromForm([
                ...locations,
                { path: "/api/team/new", proxyPass: "http://backend" },
              ]);
            }}
            block
          >
            Add Location Block
          </Button>
        </div>
      )}
    </Card>
  );
};

// --- Simple Parser Helpers ---
function parseConfig(text: string): Location[] {
  const regex = /location\s+([^{]+)\s*{[^}]*proxy_pass\s+([^;]+);[^}]*}/g;
  const results: Location[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    results.push({ path: match[1].trim(), proxyPass: match[2].trim() });
  }
  return results.length ? results : [];
}

function generateConfig(locs: Location[]): string {
  return locs
    .map((l) => `location ${l.path} {\n    proxy_pass ${l.proxyPass};\n}`)
    .join("\n\n");
}
