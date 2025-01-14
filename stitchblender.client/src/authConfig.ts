import { Configuration, PopupRequest, PublicClientApplication } from "@azure/msal-browser";

const IsGcc = window.location.origin.includes("gcc");

export const ClientId = "2698fa05-fe95-4af9-be2a-7ca4b9c2440c";

export const Authority =`https://login.microsoftonline.com/f67ffe47-50d1-4bc3-8211-a9c2c16edb18`

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: ClientId,
    authority: Authority,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    secureCookies: false
  }
};

export const Scopes = [
    //`api://${ClientId}/user_impersonation`,
    "api://2698fa05-fe95-4af9-be2a-7ca4b9c2440c/Stitch_Blender"
//    "Directory.Read.All"
];

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  //scopes: [`api://${ClientId}/user_impersonation`],    
  //scopes: [".default"]
    scopes: Scopes
};

export const msalInstance = new PublicClientApplication(msalConfig);