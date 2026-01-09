import React, { useState, useEffect } from "react";
import { DiffEditor, useMonaco } from "@monaco-editor/react";
import { Button, Tabs, Space, Card, Typography } from "antd";
import {
  ThunderboltOutlined,
  SettingOutlined,
  CodeOutlined,
  ApiOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNginxConfig } from "../hooks/useNginxConfig";
import { UpstreamsList } from "./UpstreamsList";
import { LocationsList } from "./LocationsList";

interface Props {
  upstreams: string;
  locations: string;
  onUpstreamsChange: (value: string) => void;
  onLocationsChange: (value: string) => void;
  team: string;
  originalUpstreams: string;
  originalLocations: string;
}

export const ConfigEditor: React.FC<Props> = ({
  upstreams: upstreamsProp,
  locations: locationsProp,
  onUpstreamsChange,
  onLocationsChange,
  team,
  originalUpstreams,
  originalLocations,
}) => {
  const [mode, setMode] = useState<"raw" | "wizard">("wizard");
  const [rawTab, setRawTab] = useState<"upstreams" | "locations">("locations");
  const monaco = useMonaco();

  const {
    locations,
    upstreams,
    addDirective,
    addWebsocketSupport,
    addBodySizeLimit,
    addTimeouts,
    updateDirective,
    removeDirective,
    addUpstream,
    removeUpstream,
    updateUpstreamName,
    updateUpstreamServers,
    addLocation,
    removeLocation,
    updateLocationPath,
  } = useNginxConfig(
    upstreamsProp,
    locationsProp,
    onUpstreamsChange,
    onLocationsChange
  );

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
        <Tabs
          type="card"
          items={[
            {
              key: "locations",
              label: "Locations (proxy.conf)",
              children: (
                <DiffEditor
                  height="600px"
                  language="nginx"
                  original={originalLocations}
                  modified={locationsProp}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    padding: { top: 16 },
                    renderSideBySide: false,
                  }}
                />
              ),
            },
            {
              key: "upstreams",
              label: "Upstreams (upstream.conf)",
              children: (
                <DiffEditor
                  height="600px"
                  language="nginx"
                  original={originalUpstreams}
                  modified={upstreamsProp}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    padding: { top: 16 },
                    renderSideBySide: false,
                  }}
                />
              ),
            },
          ]}
          activeKey={rawTab}
          onChange={(k) => setRawTab(k as "upstreams" | "locations")}
        />
      ) : (
        <div style={{ padding: 24 }}>
          {/* Section: Upstreams */}
          <UpstreamsList
            upstreams={upstreams}
            team={team}
            onAdd={addUpstream}
            onRemove={removeUpstream}
            onUpdateName={updateUpstreamName}
            onUpdateServers={updateUpstreamServers}
          />

          {/* Section: Locations */}
          <LocationsList
            locations={locations}
            onRemove={removeLocation}
            onUpdatePath={updateLocationPath}
            onAddDirective={addDirective}
            onUpdateDirective={updateDirective}
            onRemoveDirective={removeDirective}
            onAddWebsocket={addWebsocketSupport}
            onAddBodySize={addBodySizeLimit}
            onAddTimeouts={addTimeouts}
          />

          <Space style={{ width: "100%", marginTop: 16 }}>
            <Button
              type="primary"
              ghost
              icon={<ApiOutlined />}
              block
              onClick={() => {
                addLocation(`/api/${team}/`, [
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
                ]);
              }}
            >
              Add API Route
            </Button>
            <Button
              icon={<FileTextOutlined />}
              block
              onClick={() => {
                addLocation(`/static/${team}/`, [
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
                ]);
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
// --- Helpers moved to utils/nginx.ts ---
