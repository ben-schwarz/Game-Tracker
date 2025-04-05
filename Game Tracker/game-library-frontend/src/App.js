
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import GameLibrary from './components/GameLibrary';
import SteamSync from './components/SteamSync';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import Admin from './components/Admin'
import './App.css';
import Settings from './components/Settings';

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
  const isAuthenticated = localStorage.getItem("userToken"); // Check if user is logged in

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isAuthenticated && <Navbar />} {/* Show Navbar only when authenticated */}
        <Routes>
          {/* Authentication Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/create-account" element={<CreateAccount />} />

          {/* Protected Routes */}
          <Route path="/sync" element={isAuthenticated ? <SteamSync /> : <Navigate to="/signin" />} />
          <Route path="/library" element={isAuthenticated ? <GameLibrary /> : <Navigate to="/signin" />} />
          <Route path="/Admin" element={isAuthenticated ? <Admin /> : <Navigate to="signin" />} />

          {/* Redirect Root to Sign-In or Library */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/library" : "/signin"} />} />

          {/* Catch-All: Redirect unknown routes to Sign-In */}
          <Route path="*" element={<Navigate to="/signin" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
