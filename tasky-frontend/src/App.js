import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import Body from './components/Body';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import About from './components/About';
import PrivateRoutes from './components/PrivateRoutes';

import './App.css';

// Create theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#4568dc',
      light: '#6b8ae4',
      dark: '#2a4cb3',
    },
    secondary: {
      main: '#006E7F',
      light: '#338d9d',
      dark: '#004d59',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  const [alert, setAlert] = React.useState(null);

  const showAlert = (data) => {
    setAlert({
      type: data.type,
      msg: data.msg
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/signup" 
            element={<Signup alert={alert} showAlert={showAlert} />} 
          />
          <Route 
            path="/login" 
            element={<Login alert={alert} showAlert={showAlert} />} 
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </ThemeProvider>
  );      
}

export default App;