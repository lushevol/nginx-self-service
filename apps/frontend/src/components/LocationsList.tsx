import React from "react";
import {
  Collapse,
  Space,
  Tag,
  Button,
  Input,
  Divider,
  Typography,
  List,
  Tooltip,
} from "antd";
import {
  FolderOpenOutlined,
  DeleteOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  SaveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Location } from "../utils/nginx";

interface Props {
  locations: Location[];
  onRemove: (idx: number) => void;
  onUpdatePath: (idx: number, path: string) => void;
  onAddDirective: (locIdx: number) => void;
  onUpdateDirective: (
    locIdx: number,
    dirIdx: number,
    key: string,
    val: string
  ) => void;
  onRemoveDirective: (locIdx: number, dirIdx: number) => void;
  onAddWebsocket: (locIdx: number) => void;
  onAddBodySize: (locIdx: number) => void;
  onAddTimeouts: (locIdx: number) => void;
}

export const LocationsList: React.FC<Props> = ({
  locations,
  onRemove,
  onUpdatePath,
  onAddDirective,
  onUpdateDirective,
  onRemoveDirective,
  onAddWebsocket,
  onAddBodySize,
  onAddTimeouts,
}) => {
  return (
    <>
      <Divider orientation="left">
        <FolderOpenOutlined /> Locations
      </Divider>
      {locations.length === 0 && (
        <div style={{ textAlign: "center", marginBottom: 16, color: "#999" }}>
          No locations defined.
        </div>
      )}
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
                onRemove(idx);
              }}
            />
          ),
          children: (
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Input
                addonBefore="Path"
                value={loc.path}
                onChange={(e) => onUpdatePath(idx, e.target.value)}
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
                          onClick={() => onAddWebsocket(idx)}
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
                          onClick={() => onAddBodySize(idx)}
                        >
                          Body
                        </Button>
                      </Tooltip>
                    )}
                    {!loc.directives.some((d) =>
                      d.key.includes("_timeout")
                    ) && (
                      <Tooltip title="Add standard timeouts (60s)">
                        <Button
                          size="small"
                          icon={<SettingOutlined />}
                          onClick={() => onAddTimeouts(idx)}
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
                        onClick={() => onAddDirective(idx)}
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
                          onUpdateDirective(
                            idx,
                            dIdx,
                            e.target.value,
                            item.value
                          )
                        }
                        style={{ width: "40%" }}
                        placeholder="Key"
                      />
                      <Input
                        value={item.value}
                        onChange={(e) =>
                          onUpdateDirective(idx, dIdx, item.key, e.target.value)
                        }
                        style={{ flex: 1 }}
                        placeholder="Value"
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => onRemoveDirective(idx, dIdx)}
                      />
                    </div>
                  )}
                />
              </div>
            </Space>
          ),
        }))}
      />
    </>
  );
};
