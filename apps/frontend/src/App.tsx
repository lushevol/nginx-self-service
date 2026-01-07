import { useState, useEffect } from "react";
import { Layout, Typography, Button, message, Alert, Modal } from "antd";
import { TeamSelector } from "./components/TeamSelector";
import { ConfigEditor } from "./components/ConfigEditor";
import { PendingRequestBanner } from "./components/PendingRequestBanner";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const [team, setTeam] = useState("checkout");
  const [env, setEnv] = useState("dev");
  const [upstreams, setUpstreams] = useState("");
  const [locations, setLocations] = useState("");
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
      setLoading(true);
      const res = await axios.get(`/api/nginx/${t}/${e}`);
      setUpstreams(res.data.upstreams || "");
      setLocations(res.data.locations || "");
      message.success(`Loaded config for ${t} [${e}]`);
    } catch {
      message.error("Failed to load config");
    } finally {
      setLoading(false);
    }
  };

  const fetchPending = async (t: string) => {
    try {
      const res = await axios.get(`/api/nginx/${t}/pending`);
      setPendingRequests(res.data);
    } catch {
      console.error("Failed to load pending requests");
    }
  };

  useEffect(() => {
    fetchConfig(team, env);
    fetchPending(team);

    // Poll for pending updates every 5s
    const interval = setInterval(() => fetchPending(team), 60000);
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
        fetchPending(team);
      },
    });
  };

  const handleValidate = async () => {
    try {
      setLoading(true);
      setPrUrl(null);
      await axios.post(`/api/nginx/${team}/validate`, {
        upstreams,
        locations,
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
      setLoading(true);
      const res = await axios.post(`/api/nginx/${team}/submit/${env}`, {
        upstreams,
        locations,
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
          <PendingRequestBanner
            request={pendingRequests[0]}
            team={team}
            onRefresh={() => fetchPending(team)}
          />
        )}

        <ConfigEditor
          upstreams={upstreams}
          locations={locations}
          onUpstreamsChange={setUpstreams}
          onLocationsChange={setLocations}
          team={team}
        />

        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <Button type="primary" onClick={handleValidate} loading={loading}>
            Validate Config
          </Button>
          <Button
            danger
            onClick={handleSubmit}
            loading={loading}
            disabled={
              (!upstreams && !locations) ||
              pendingRequests.some((r) => r.status === "PENDING")
            }
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
