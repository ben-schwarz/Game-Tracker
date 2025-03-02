import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import GameLibrary from './components/GameLibrary';
import SteamSync from './components/SteamSync';
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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<GameLibrary />} />
          <Route path="/sync" element={<SteamSync />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
