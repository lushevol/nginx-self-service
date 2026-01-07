import React from "react";
import { Collapse, Space, Tag, Button, Input, Divider } from "antd";
import {
  GlobalOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Upstream } from "../utils/nginx";

interface Props {
  upstreams: Upstream[];
  team: string;
  onAdd: (team: string) => void;
  onRemove: (idx: number) => void;
  onUpdateName: (idx: number, name: string) => void;
  onUpdateServers: (idx: number, servers: string) => void;
}

export const UpstreamsList: React.FC<Props> = ({
  upstreams,
  team,
  onAdd,
  onRemove,
  onUpdateName,
  onUpdateServers,
}) => {
  return (
    <>
      <Divider orientation="left">
        <GlobalOutlined /> Upstreams
      </Divider>
      {upstreams.length === 0 && (
        <div style={{ textAlign: "center", marginBottom: 16, color: "#999" }}>
          No upstreams defined.
        </div>
      )}
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
                onRemove(idx);
              }}
            />
          ),
          children: (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                addonBefore="Name"
                value={u.name}
                onChange={(e) => onUpdateName(idx, e.target.value)}
              />
              <Input.TextArea
                rows={3}
                value={u.servers.join("\n")}
                onChange={(e) => onUpdateServers(idx, e.target.value)}
                placeholder="server 10.0.0.1:8080;"
              />
            </Space>
          ),
        }))}
      />
      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={() => onAdd(team)}
        style={{ marginTop: 16 }}
      >
        Add Upstream
      </Button>
    </>
  );
};
