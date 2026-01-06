import React, { useState, useEffect } from "react";
import { Layout, Typography, Button, message, Alert, Modal } from "antd";
import { TeamSelector } from "./components/TeamSelector";
import { ConfigEditor } from "./components/ConfigEditor";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const [team, setTeam] = useState("checkout");
  const [env, setEnv] = useState("dev");
  const [config, setConfig] = useState("");
  const [loading, setLoading] = useState(false);
  const [prUrl, setPrUrl] = useState<string | null>(null);

  // [5. when switch env and team, should pop up alert then initial from data source]
  const fetchConfig = async (t: string, e: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`//api/nginx/${t}/${e}`);
      setConfig(res.data.content);
      message.success(`Loaded config for ${t} [${e}]`);
    } catch (err) {
      message.error("Failed to load config");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig(team, env);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial load

  const handleTeamChange = (newTeam: string) => {
    Modal.confirm({
      title: "Switch Team?",
      content: "Unsaved changes will be lost. Do you want to continue?",
      onOk: () => {
        setTeam(newTeam);
        fetchConfig(newTeam, env);
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
      await axios.post(`http://localhost:3000/api/nginx/${team}/validate`, {
        content: config,
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
      const res = await axios.post(
        `http://localhost:3000/api/nginx/${team}/submit/${env}`,
        { content: config }
      );
      setPrUrl(res.data.prUrl);
      message.success("PR Created Successfully!");
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
            Submit PR
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
