
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import './App.css';
import { HeaderBar } from './components/HeaderBar/HeaderBar';
import { PatternEditor } from './components/PatternEditor/PatternEditor';
import { msalInstance } from './authConfig';
import { Routes, Route } from 'react-router-dom';
import { Login, LoginRedirect } from './pages';

const MainContent = () => {

  return (
    <>
      <AuthenticatedTemplate>
        <div>
          <HeaderBar />
          <PatternEditor />
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path="*" element={<LoginRedirect />} />
        </Routes>
      </UnauthenticatedTemplate>
    </>
  );
};

function App() {

  return (
    <MsalProvider instance={msalInstance}>
      <MainContent />
    </MsalProvider>
  );
}

export default App;