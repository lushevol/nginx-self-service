import React, { useState, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import {
  Input,
  Button,
  Tabs,
  Space,
  Card,
  List,
  Typography,
  Collapse,
  Tag,
  Tooltip,
  Divider,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  GlobalOutlined,
  FolderOpenOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  CodeOutlined,
  ApiOutlined,
  FileTextOutlined,
  SaveOutlined,
} from "@ant-design/icons";

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
            [/proxy_redirect\s+/, "keyword"],
            [/add_header\s+/, "keyword"],
            [/proxy_http_version\s+/, "keyword"],
            [/client_max_body_size\s+/, "keyword"],
            [/proxy_connect_timeout\s+/, "keyword"],
            [/proxy_send_timeout\s+/, "keyword"],
            [/proxy_read_timeout\s+/, "keyword"],
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const addWebsocketSupport = (locIdx: number) => {
    const newLocs = [...locations];
    newLocs[locIdx].directives.push(
      { key: "proxy_http_version", value: "1.1" },
      { key: "proxy_set_header", value: "Upgrade $http_upgrade" },
      { key: "proxy_set_header", value: 'Connection "upgrade"' }
    );
    updateFromForm(newLocs, upstreams);
  };

  const addBodySizeLimit = (locIdx: number) => {
    const newLocs = [...locations];
    newLocs[locIdx].directives.push({
      key: "client_max_body_size",
      value: "10m",
    });
    updateFromForm(newLocs, upstreams);
  };

  const addTimeouts = (locIdx: number) => {
    const newLocs = [...locations];
    newLocs[locIdx].directives.push(
      { key: "proxy_connect_timeout", value: "60s" },
      { key: "proxy_send_timeout", value: "60s" },
      { key: "proxy_read_timeout", value: "60s" }
    );
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

  // UI Components
  const renderUpstreams = () => (
    <Collapse
      ghost
      defaultActiveKey={["0"]}
      items={upstreams.map((u, idx) => ({
        key: idx.toString(),
        label: (
          <Space>
            <GlobalOutlined style={{ color: "#1890ff" }} />
            <span style={{ fontWeight: 500 }}>{u.name}</span>
            <Tag color="geekblue">{u.servers.length} servers</Tag>
          </Space>
        ),
        extra: (
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              const newUps = upstreams.filter((_, i) => i !== idx);
              updateFromForm(locations, newUps);
            }}
          />
        ),
        children: (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              addonBefore="Name"
              value={u.name}
              onChange={(e) => {
                const newUps = [...upstreams];
                newUps[idx].name = e.target.value;
                updateFromForm(locations, newUps);
              }}
            />
            <Input.TextArea
              rows={3}
              value={u.servers.join("\n")}
              onChange={(e) => {
                const newUps = [...upstreams];
                newUps[idx].servers = e.target.value.split("\n");
                updateFromForm(locations, newUps);
              }}
              placeholder="server 10.0.0.1:8080;"
            />
          </Space>
        ),
      }))}
    />
  );

  const renderLocations = () => (
    <Collapse
      defaultActiveKey={["0"]}
      items={locations.map((loc, idx) => ({
        key: idx.toString(),
        label: (
          <Space>
            <FolderOpenOutlined style={{ color: "#faad14" }} />
            <span style={{ fontWeight: 500 }}>{loc.path}</span>
            <Tag>{loc.directives.length} directives</Tag>
          </Space>
        ),
        extra: (
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              const newLocs = locations.filter((_, i) => i !== idx);
              updateFromForm(newLocs, upstreams);
            }}
          />
        ),
        children: (
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Input
              addonBefore="Path"
              value={loc.path}
              onChange={(e) => {
                const newLocs = [...locations];
                newLocs[idx].path = e.target.value;
                updateFromForm(newLocs, upstreams);
              }}
              prefix={<FolderOpenOutlined style={{ color: "#bfbfbf" }} />}
            />

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <Typography.Text strong>
                  <SettingOutlined /> Directives
                </Typography.Text>
                <Space size={2}>
                  {!loc.directives.some((d) =>
                    d.value.toLowerCase().includes("upgrade")
                  ) && (
                    <Tooltip title="Add Upgrade & Connection headers">
                      <Button
                        size="small"
                        icon={<ThunderboltOutlined />}
                        onClick={() => addWebsocketSupport(idx)}
                      >
                        WS
                      </Button>
                    </Tooltip>
                  )}
                  {!loc.directives.some(
                    (d) => d.key === "client_max_body_size"
                  ) && (
                    <Tooltip title="Add client_max_body_size 10m">
                      <Button
                        size="small"
                        icon={<SaveOutlined />}
                        onClick={() => addBodySizeLimit(idx)}
                      >
                        Body
                      </Button>
                    </Tooltip>
                  )}
                  {!loc.directives.some((d) => d.key.includes("_timeout")) && (
                    <Tooltip title="Add standard timeouts (60s)">
                      <Button
                        size="small"
                        icon={<SettingOutlined />}
                        onClick={() => addTimeouts(idx)}
                      >
                        Timeout
                      </Button>
                    </Tooltip>
                  )}
                  <Tooltip title="Add custom directive">
                    <Button
                      type="primary"
                      size="small"
                      ghost
                      icon={<PlusOutlined />}
                      onClick={() => addDirective(idx)}
                    >
                      Add
                    </Button>
                  </Tooltip>
                </Space>
              </div>

              <List
                size="small"
                dataSource={loc.directives}
                renderItem={(item, dIdx) => (
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 8,
                      alignItems: "center",
                    }}
                  >
                    <Input
                      value={item.key}
                      onChange={(e) =>
                        updateDirective(idx, dIdx, e.target.value, item.value)
                      }
                      style={{ width: "40%" }}
                      placeholder="Key"
                    />
                    <Input
                      value={item.value}
                      onChange={(e) =>
                        updateDirective(idx, dIdx, item.key, e.target.value)
                      }
                      style={{ flex: 1 }}
                      placeholder="Value"
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeDirective(idx, dIdx)}
                    />
                  </div>
                )}
              />
            </div>
          </Space>
        ),
      }))}
    />
  );

  return (
    <Card
      title={
        <Space>
          <CodeOutlined />
          <span>Nginx Configuration</span>
        </Space>
      }
      bodyStyle={{ padding: 0 }}
      extra={
        <Tabs
          type="card"
          size="small"
          activeKey={mode}
          onChange={(k) => setMode(k as "raw" | "wizard")}
          items={[
            {
              key: "wizard",
              label: (
                <span>
                  <SettingOutlined /> Wizard
                </span>
              ),
            },
            {
              key: "raw",
              label: (
                <span>
                  <CodeOutlined /> Raw
                </span>
              ),
            },
          ]}
          style={{ marginBottom: -16 }} // Hack to align tabs with header
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
          options={{
            minimap: { enabled: false },
            padding: { top: 16 },
          }}
        />
      ) : (
        <div style={{ padding: 24 }}>
          {/* Section: Upstreams */}
          <Divider orientation="left">
            <GlobalOutlined /> Upstreams
          </Divider>
          {upstreams.length === 0 && (
            <div
              style={{ textAlign: "center", marginBottom: 16, color: "#999" }}
            >
              No upstreams defined.
            </div>
          )}
          {renderUpstreams()}
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={() => {
              updateFromForm(locations, [
                ...upstreams,
                {
                  name: `${team}_backend_service`,
                  servers: ["your_backend_service:8080"],
                },
              ]);
            }}
            style={{ marginTop: 16 }}
          >
            Add Upstream
          </Button>

          {/* Section: Locations */}
          <Divider orientation="left">
            <FolderOpenOutlined /> Locations
          </Divider>
          {locations.length === 0 && (
            <div
              style={{ textAlign: "center", marginBottom: 16, color: "#999" }}
            >
              No locations defined.
            </div>
          )}
          {renderLocations()}

          <Space style={{ width: "100%", marginTop: 16 }}>
            <Button
              type="primary"
              ghost
              icon={<ApiOutlined />}
              block
              onClick={() => {
                updateFromForm(
                  [
                    ...locations,
                    {
                      path: `/api/${team}/`,
                      directives: [
                        {
                          key: "rewrite",
                          value: `^/api/${team}/(.*)$ /$1 break`,
                        },
                        { key: "proxy_redirect", value: "off" },
                        {
                          key: "proxy_set_header",
                          value: "X-Real-IP $remote_addr",
                        },
                        {
                          key: "proxy_set_header",
                          value: "X-Forwarded-Proto http",
                        },
                        {
                          key: "proxy_set_header",
                          value: "X-Forwarded-For $remote_addr",
                        },
                        {
                          key: "proxy_set_header",
                          value: "X-Forwarded-Host $remote_addr",
                        },
                        {
                          key: "proxy_pass",
                          value: `https://${team}_backend_service`,
                        },
                      ],
                    },
                  ],
                  upstreams
                );
              }}
            >
              Add API Route
            </Button>
            <Button
              icon={<FileTextOutlined />}
              block
              onClick={() => {
                updateFromForm(
                  [
                    ...locations,
                    {
                      path: `/static/${team}/`,
                      directives: [
                        {
                          key: "rewrite",
                          value: `^/static/${team}/(.*)$ /$1 break`,
                        },
                        { key: "proxy_redirect", value: "off" },
                        {
                          key: "proxy_set_header",
                          value: "X-Real-IP $remote_addr",
                        },
                        {
                          key: "proxy_set_header",
                          value: "X-Forwarded-Proto http",
                        },
                        {
                          key: "proxy_set_header",
                          value: "X-Forwarded-For $remote_addr",
                        },
                        {
                          key: "proxy_set_header",
                          value: "X-Forwarded-Host $remote_addr",
                        },
                        {
                          key: "add_header",
                          value: 'Cache-Control "no-cache"',
                        },
                        {
                          key: "proxy_pass",
                          value: `https://${team}_static_server`,
                        },
                      ],
                    },
                  ],
                  upstreams
                );
              }}
            >
              Add Static Route
            </Button>
          </Space>

          {/* Tips Section */}
          <div
            style={{
              marginTop: 32,
              background: "#f5f5f5",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              <strong style={{ display: "block", marginBottom: 4 }}>
                <ThunderboltOutlined /> Pro Tips:
              </strong>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>
                  Use <code>rewrite</code> to strip prefixes before passing to
                  backend services.
                </li>
                <li>
                  Upstream names must match the <code>proxy_pass</code>{" "}
                  destination strictly.
                </li>
                <li>
                  Use the <strong>WS</strong> button to quickly add Websocket
                  support headers.
                </li>
              </ul>
            </Typography.Text>
          </div>
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
