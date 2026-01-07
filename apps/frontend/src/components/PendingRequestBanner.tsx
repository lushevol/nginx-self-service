import React from "react";
import { Button, message } from "antd";
import axios from "axios";

interface ChangeRequest {
  id: string;
  team: string;
  environment: string;
  status: string;
  prId?: string;
  createdAt: number;
}

interface Props {
  request: ChangeRequest;
  team: string;
  onRefresh: () => void;
}

export const PendingRequestBanner: React.FC<Props> = ({
  request,
  team,
  onRefresh,
}) => {
  const handleAbandon = async () => {
    try {
      await axios.delete(`/api/nginx/${team}/pending/${request.id}`);
      message.success("Request abandoned");
      onRefresh();
    } catch {
      message.error("Failed to abandon request");
    }
  };

  return (
    <div
      style={{
        marginBottom: 20,
        padding: "12px 24px",
        background: "#e6f7ff",
        border: "1px solid #91d5ff",
        borderRadius: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontWeight: 600, color: "#0050b3" }}>
          Status: {request.status}
        </span>
        <span style={{ color: "#595959", fontSize: 13 }}>
          {new Date(request.createdAt).toLocaleString()}
        </span>
        {request.prId && (
          <a
            href={`https://dev.azure.com/myorg/nginx-repo/_git/repo/pullrequest/${request.prId}`}
            target="_blank"
            rel="noreferrer"
            style={{ fontWeight: 500 }}
          >
            View PR #{request.prId}
          </a>
        )}
      </div>
      {(request.status === "PENDING" || request.status === "FAILED") && (
        <Button size="small" danger type="text" onClick={handleAbandon}>
          Abandon
        </Button>
      )}
    </div>
  );
};
