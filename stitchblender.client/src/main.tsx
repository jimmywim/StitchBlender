import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>  
  </StrictMode>,
)
