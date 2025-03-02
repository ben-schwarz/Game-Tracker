import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Game Library
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Library
        </Button>
        <Button color="inherit" component={RouterLink} to="/sync">
          Sync Steam
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;