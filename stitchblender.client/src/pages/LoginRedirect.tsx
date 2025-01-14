import * as React from 'react';
import { useNavigate, useLocation } from 'react-router';

export const LoginRedirect: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname == '/login') {
      const loginIntent = new URLSearchParams(location.search).get("loginIntent");

      if (loginIntent && loginIntent.length > 0) {
        navigate(loginIntent);
      } else {
        navigate('/');
      }
    }
    else {

      navigate(`/login?loginIntent=${location.pathname}`);
    }
  }, [location, navigate]);

  return (
    <div>

    </div>
  );
}