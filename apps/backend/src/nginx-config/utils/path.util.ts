export class PathUtil {
  static getUpstreamPath(env: string, team: string): string {
    return `nginx/${env}/${team}/upstream.conf`;
  }

  static getProxyPath(env: string, team: string): string {
    return `nginx/${env}/${team}/proxy.conf`;
  }
}
