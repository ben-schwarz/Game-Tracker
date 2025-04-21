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
import GoogleSignIn from './components/GoogleSignIn'; // ✅ From sprint-4
import About from './components/About';               // ✅ From main
import Friends from './components/Friends';           // ✅ From main

import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';

// User preference maps
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

// Theme setup
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
        <Route path="/google-signin" element={<GoogleSignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sync" element={<SteamSync/>} />
        <Route path="/admin" element={<Admin /> } />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-game" element={<AddGame />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/library" element={<GameLibrary />} />



        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;

