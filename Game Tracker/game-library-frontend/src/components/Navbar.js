import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  // Get authentication state and current user from your auth context
  const { isAuthenticated, currentUser, logout } = useAuth();

  // Optionally, get the profile image from the current user (if available)
  const profileImage = currentUser?.profileImage; // Adjust property name if needed

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
        {isAuthenticated ? (
          <>
            <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
              Welcome, {currentUser?.username}
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/signin">
              Sign In
            </Button>
            {profileImage && (
              <Avatar
                src={profileImage}
                alt="Profile"
                sx={{ width: 36, height: 36, marginLeft: 2 }}
              />
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
