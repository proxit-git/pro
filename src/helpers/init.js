import { isValidUUID } from "./helpers";
import pkg from '../../package.json' with { type: 'json' };

export function initializeParams(request, env) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    globalThis.panelVersion = pkg.version;
    globalThis.defaultHttpPorts = [80, 8080, 2052, 2082, 2086, 2095, 8880];
    globalThis.defaultHttpsPorts = [443, 8443, 2053, 2083, 2087, 2096];
    globalThis.userID = env.USERNAME;
    globalThis.TRPassword = env.PASSWORD;
    globalThis.proxyIPs = env.PIP || 'www.speedtest.net';
    globalThis.hostName = request.headers.get('Host');
    globalThis.pathName = url.pathname;
    globalThis.client = searchParams.get('app');
    globalThis.urlOrigin = url.origin;
    globalThis.dohURL = env.DNS || 'https://freedns.controld.com/no-ads-malware';
    globalThis.fallbackDomain = env.FALLBACK || 'wikipedia.org';
    globalThis.subPath = env.URLPATH || globalThis.userID;
    if (!['/error', '/secrets', '/file.ico'].includes(globalThis.pathName)) {
        if (!globalThis.userID || !globalThis.TRPassword) throw new Error(`Set Username And Password. Please Visit <a href="${globalThis.urlOrigin}/secrets" target="_blank">This Section</a>`, { cause: "init" });
        if (globalThis.userID && !isValidUUID(globalThis.userID)) throw new Error(`Invalid USERNAME: ${globalThis.userID}`, { cause: "init" });
        if (typeof env.WALLET !== 'object') throw new Error('Dataset Error', { cause: "init" });
    }
}