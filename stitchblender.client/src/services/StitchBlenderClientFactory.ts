import { AuthenticationResult } from "@azure/msal-browser";
import { createStitchBlenderClient, StitchBlenderClient } from "../sbClient/stitchBlenderClient";
import { Authority, msalInstance, Scopes } from "../authConfig";
import { AccessTokenProvider, AllowedHostsValidator, BaseBearerTokenAuthenticationProvider } from "@microsoft/kiota-abstractions";
import { FetchRequestAdapter, HttpClient, KiotaClientFactory, ParametersNameDecodingHandler, UserAgentHandler, RetryHandler, RedirectHandler, HeadersInspectionHandler } from '@microsoft/kiota-http-fetchlibrary';


export class StitchBlenderClientFactory {
  private static client: StitchBlenderClient;

  public static getClient(): StitchBlenderClient {
    if (!this.client) {
      const tokenProvider = new AzureAdTokenProvider();
      const authProvider = new BaseBearerTokenAuthenticationProvider(tokenProvider);
      const httpClient = new HttpClient(window.fetch.bind(window));

      const http = KiotaClientFactory.create(undefined, [
        new RetryHandler(), new RedirectHandler(), new ParametersNameDecodingHandler(), new UserAgentHandler(), new HeadersInspectionHandler()
      ])

      const adapter = new FetchRequestAdapter(authProvider, undefined, undefined, http);

      this.client = createStitchBlenderClient(adapter);
    }

    return this.client;
  }
}


class AzureAdTokenProvider implements AccessTokenProvider {
  private authResult?: AuthenticationResult;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAuthorizationToken = async (url?: string | undefined, additionalAuthenticationContext?: Record<string, unknown> | undefined) => {
    if (this.authResult?.expiresOn) {
      const now = new Date();
      if (now < this.authResult.expiresOn) {
        return this.authResult.accessToken;
      }
    }
    
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }

    const authResult = await msalInstance.acquireTokenSilent({
      scopes: Scopes,
      authority: Authority
    });

    this.authResult = authResult;
    return authResult.accessToken;
  };

  getAllowedHostsValidator = () => new AllowedHostsValidator();
}