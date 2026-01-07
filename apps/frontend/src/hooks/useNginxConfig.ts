import { useState, useEffect } from "react";
import {
  parseConfig,
  generateUpstreamsBlock,
  generateLocationsBlock,
  type Location,
  type Upstream,
} from "../utils/nginx";

export const useNginxConfig = (
  upstreamsContent: string,
  locationsContent: string,
  onUpstreamsChange: (val: string) => void,
  onLocationsChange: (val: string) => void
) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [upstreams, setUpstreams] = useState<Upstream[]>([]);

  // Sync Text -> Form
  useEffect(() => {
    const { upstrs } = parseConfig(upstreamsContent);
    setUpstreams(upstrs);
  }, [upstreamsContent]);

  useEffect(() => {
    const { locs } = parseConfig(locationsContent);
    setLocations(locs);
  }, [locationsContent]);

  const updateFromForm = (
    newLocations: Location[],
    newUpstreams: Upstream[]
  ) => {
    setLocations(newLocations);
    setUpstreams(newUpstreams);

    // Only update if changed slightly optimization or just direct
    const uStr = generateUpstreamsBlock(newUpstreams);
    const lStr = generateLocationsBlock(newLocations);

    onUpstreamsChange(uStr);
    onLocationsChange(lStr);
  };

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

  // Upstream Operations
  const addUpstream = (team: string) => {
    updateFromForm(locations, [
      ...upstreams,
      {
        name: `${team}_backend_service`,
        servers: ["your_backend_service:8080"],
      },
    ]);
  };

  const removeUpstream = (idx: number) => {
    const newUps = upstreams.filter((_, i) => i !== idx);
    updateFromForm(locations, newUps);
  };

  const updateUpstreamName = (idx: number, name: string) => {
    const newUps = [...upstreams];
    newUps[idx].name = name;
    updateFromForm(locations, newUps);
  };

  const updateUpstreamServers = (idx: number, serversStr: string) => {
    const newUps = [...upstreams];
    newUps[idx].servers = serversStr.split("\n");
    updateFromForm(locations, newUps);
  };

  // Location Operations
  const addLocation = (
    path: string,
    directives: { key: string; value: string }[]
  ) => {
    updateFromForm([...locations, { path, directives }], upstreams);
  };

  const removeLocation = (idx: number) => {
    const newLocs = locations.filter((_, i) => i !== idx);
    updateFromForm(newLocs, upstreams);
  };

  const updateLocationPath = (idx: number, path: string) => {
    const newLocs = [...locations];
    newLocs[idx].path = path;
    updateFromForm(newLocs, upstreams);
  };

  return {
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
  };
};
