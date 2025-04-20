import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import GameLibrary from './components/GameLibrary';
import SteamSync from './components/SteamSync';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import Admin from './components/Admin';
import Settings from './components/Settings';
import AddGame from './components/AddGame';
import GoogleSignIn from './components/GoogleSignIn';
import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';

const fontSizeMap = {
  small: 12,
  medium: 16,
  large: 20,
};

const themeColorMap = {
  blue: '#556cd6',
  green: '#2e7d32',
  red: '#d32f2f',
  orange: '#ed6c02',
  purple: '#7e57c2',
};

const userFontSize = localStorage.getItem("fontSize") || "medium";
const userThemeColor = localStorage.getItem("themeColor") || "blue";

const theme = createTheme({
  palette: {
    primary: { main: themeColorMap[userThemeColor] },
    secondary: { main: '#19857b' },
  },
  typography: {
    fontSize: fontSizeMap[userFontSize],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <RoutesWithAuth />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function RoutesWithAuth() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/GoogleSignIn" element={<GoogleSignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />

        {/* Protected routes */}
        <Route path="/sync" element={isAuthenticated ? <SteamSync /> : <Navigate to="/signin" />} />
        <Route path="/library" element={isAuthenticated ? <GameLibrary /> : <Navigate to="/signin" />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/signin" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />} />
        <Route path="/add-game" element={isAuthenticated ? <AddGame /> : <Navigate to="/signin" />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/library" : "/signin"} />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;

