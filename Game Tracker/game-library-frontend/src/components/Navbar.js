import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const profileImage = currentUser?.profileImage;

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Game Library
          </Typography>

          <Button color="inherit" component={RouterLink} to="/admin">
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
          <Button color="inherit" component={RouterLink} to="/add-game">
            Add Game
          </Button>
          <Button color="inherit" component={RouterLink} to="/friends">
            Friends
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>

          {isAuthenticated ? (
              <>
                <Typography variant="subtitle1" sx={{ marginLeft: 2, marginRight: 1 }}>
                  Welcome, {currentUser?.username}
                </Typography>
                {profileImage && (
                    <Avatar
                        src={profileImage}
                        alt="Profile"
                        sx={{ width: 36, height: 36, marginLeft: 1, marginRight: 2 }}
                    />
                )}
                <Button color="inherit" onClick={logout}>
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
