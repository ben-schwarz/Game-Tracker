import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

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
        <Button color="inherit" component={RouterLink} to="/settings">
          Settings
        </Button>
        <Button color="inherit" component={RouterLink} to="/signin">
          Sign In
        </Button>

        {/* 🖼️ Profile Image Avatar */}
        {profileImage && (
          <Avatar
            src={profileImage}
            alt="Profile"
            sx={{ width: 36, height: 36, marginLeft: 2 }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
