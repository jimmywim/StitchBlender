import * as React from 'react';
import { loginRequest, msalInstance } from '../authConfig';

export const Login: React.FunctionComponent = () => {

  React.useEffect(() => {
    login();
  }, []);

  const login = async () => {
    await msalInstance.loginRedirect(loginRequest);
  }

  return <div></div>;
}