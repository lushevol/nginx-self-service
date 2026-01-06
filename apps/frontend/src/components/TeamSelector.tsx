import React from "react";
import { Select, Space } from "antd";

interface Props {
  team: string;
  setTeam: (val: string) => void;
  env: string;
  setEnv: (val: string) => void;
}

export const TeamSelector: React.FC<Props> = ({
  team,
  setTeam,
  env,
  setEnv,
}) => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <Select
        style={{ width: 200 }}
        placeholder="Select Team"
        value={team}
        onChange={setTeam}
        options={[
          { value: "checkout", label: "Checkout Team" },
          { value: "payments", label: "Payments Team" },
          { value: "search", label: "Search Team" },
        ]}
      />

      <Select
        style={{ width: 120 }}
        placeholder="Environment"
        value={env}
        onChange={setEnv}
        options={[
          { value: "dev", label: "Dev" },
          { value: "uat", label: "UAT" },
          { value: "prod", label: "Prod" },
        ]}
      />
    </Space>
  );
};
