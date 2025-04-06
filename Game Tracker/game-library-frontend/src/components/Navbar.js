import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  // Get authentication state and current user from your auth context
  const { isAuthenticated, currentUser, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Game Library
        </Typography>
        <Button color="inherit" component={RouterLink} to="/Admin">
          Admin
        </Button>
        <Button color="inherit" component={RouterLink} to="/">
          Library
        </Button>
        <Button color="inherit" component={RouterLink} to="/sync">
          Sync Steam
        </Button>
        {isAuthenticated ? (
          <>
            <Typography variant="subtitle1" sx={{ marginRight: '1rem' }}>
              Welcome, {currentUser?.username}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={RouterLink} to="/signin">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
