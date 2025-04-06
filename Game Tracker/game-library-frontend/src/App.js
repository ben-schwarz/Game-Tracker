import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import GameLibrary from './components/GameLibrary';
import SteamSync from './components/SteamSync';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import Admin from './components/Admin';
import {AuthProvider, useAuth } from './components/AuthContext'; // Ensure this path is correct

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider> {/* Provide the AuthContext */}
        <Router>
          <RoutesWithAuth />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function RoutesWithAuth() {
  const { isAuthenticated } = useAuth(); // Use authentication context within the AuthProvider

  return (
    <>
      {isAuthenticated && <Navbar />} {/* Show Navbar only when authenticated */}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/sync" element={isAuthenticated ? <SteamSync /> : <Navigate to="/signin" />} />
        <Route path="/library" element={isAuthenticated ? <GameLibrary /> : <Navigate to="/signin" />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/signin" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/library" : "/signin"} />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;


