import { useState, useEffect } from "react";
import { Layout, Typography, Button, message, Alert, Modal } from "antd";
import { TeamSelector } from "./components/TeamSelector";
import { ConfigEditor } from "./components/ConfigEditor";
import axios from "axios";
import {
  parseConfig,
  generateUpstreamsBlock,
  generateLocationsBlock,
} from "./utils/nginx";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const [team, setTeam] = useState("checkout");
  const [env, setEnv] = useState("dev");
  const [config, setConfig] = useState("");
  const [loading, setLoading] = useState(false);
  const [prUrl, setPrUrl] = useState<string | null>(null);

  interface ChangeRequest {
    id: string;
    team: string;
    environment: string;
    status: string;
    prId?: string;
    createdAt: number;
  }

  // Pending Requests State
  const [pendingRequests, setPendingRequests] = useState<ChangeRequest[]>([]);

  // Helpers
  // [5. when switch env and team, should pop up alert then initial from data source]
  const fetchConfig = async (t: string, e: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/nginx/${t}/${e}`);
      const content = res.data.content;
      setConfig(content); // full config for editor
      message.success(`Loaded config for ${t} [${e}]`);
    } catch (err) {
      message.error("Failed to load config");
    } finally {
      setLoading(false);
    }
  };

  const fetchPending = async (t: string) => {
    try {
      const res = await axios.get(`/api/nginx/${t}/pending`);
      setPendingRequests(res.data);
    } catch (e) {
      console.error("Failed to load pending requests");
    }
  };

  useEffect(() => {
    fetchConfig(team, env);
    fetchPending(team);

    // Poll for pending updates every 5s
    const interval = setInterval(() => fetchPending(team), 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial load - team/env changes handled by handlers

  const handleTeamChange = (newTeam: string) => {
    Modal.confirm({
      title: "Switch Team?",
      content: "Unsaved changes will be lost. Do you want to continue?",
      onOk: () => {
        setTeam(newTeam);
        fetchConfig(newTeam, env);
        fetchPending(newTeam);
      },
    });
  };

  const handleEnvChange = (newEnv: string) => {
    Modal.confirm({
      title: "Switch Environment?",
      content: "Unsaved changes will be lost. Do you want to continue?",
      onOk: () => {
        setEnv(newEnv);
        fetchConfig(team, newEnv);
      },
    });
  };

  const handleValidate = async () => {
    try {
      setLoading(true);
      setPrUrl(null);
      const { locs, upstrs } = parseConfig(config);
      await axios.post(`/api/nginx/${team}/validate`, {
        upstreams: generateUpstreamsBlock(upstrs),
        locations: generateLocationsBlock(locs),
      });
      message.success("Configuration is valid!");
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msg = (e as any).response?.data?.message || (e as Error).message;
      message.error("Validation Failed: " + JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { locs, upstrs } = parseConfig(config);
      const res = await axios.post(`/api/nginx/${team}/submit/${env}`, {
        upstreams: generateUpstreamsBlock(upstrs),
        locations: generateLocationsBlock(locs),
      });
      // response: { changeId, status, message }
      message.success(res.data.message);
      fetchPending(team); // refresh pending list
    } catch {
      message.error("Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Nginx Self-Service Portal
        </Title>
      </Header>
      <Content style={{ padding: "20px 50px" }}>
        <TeamSelector
          team={team}
          setTeam={handleTeamChange}
          env={env}
          setEnv={handleEnvChange}
        />

        {/* Pending Requests Alert */}
        {pendingRequests.length > 0 && (
          <Alert
            message={`Pending Changes: ${pendingRequests.length}`}
            description={
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {pendingRequests.map((req) => (
                  <li key={req.id}>
                    {req.status} - {new Date(req.createdAt).toLocaleString()}
                    {req.prId && (
                      <a
                        href={`https://dev.azure.com/myorg/nginx-repo/_git/repo/pullrequest/${req.prId}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ marginLeft: 10 }}
                      >
                        PR #{req.prId}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            }
            type="info"
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        <ConfigEditor value={config} onChange={setConfig} team={team} />

        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <Button type="primary" onClick={handleValidate} loading={loading}>
            Validate Config
          </Button>
          <Button
            danger
            onClick={handleSubmit}
            loading={loading}
            disabled={!config}
          >
            Submit Change Request
          </Button>
        </div>

        {prUrl && (
          <Alert
            message="Pull Request Created"
            description={
              <a href={prUrl} target="_blank" rel="noreferrer">
                {prUrl}
              </a>
            }
            type="success"
            showIcon
            style={{ marginTop: 20 }}
          />
        )}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Nginx Gateway Portal ©2024
      </Footer>
    </Layout>
  );
};

export default App;
