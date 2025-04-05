import React, { useState, useEffect } from "react";
import {
  Typography,
  Switch,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
} from "@mui/material";

function Settings() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [accountSaved, setAccountSaved] = useState(false);

  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [notifications, setNotifications] = useState(localStorage.getItem("notifications") === "true");
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");
  const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "blue");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [showResetDialog, setShowResetDialog] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
    localStorage.setItem("notifications", notifications);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("themeColor", themeColor);
    localStorage.setItem("profileImage", profileImage);
  }, [language, notifications, fontSize, themeColor, profileImage]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  const handleSaveAccount = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 2000);
  };

  const handleChangePassword = () => {
    const storedPassword = localStorage.getItem(`user_${username}`);
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("All fields are required.");
      return;
    }
    if (storedPassword !== currentPassword) {
      setPasswordMessage("Current password is incorrect.");
      return;
    }
    if (newPassword.length < 4) {
      setPasswordMessage("New password must be at least 4 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    localStorage.setItem(`user_${username}`, newPassword);
    setPasswordMessage("Password changed successfully ✅");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordMessage(""), 3000);
  };

  const resetPreferences = () => {
    setDarkMode(false);
    setNotifications(false);
    setLanguage("en");
    setFontSize("medium");
    setThemeColor("blue");

    localStorage.setItem("darkMode", false);
    localStorage.setItem("notifications", false);
    localStorage.setItem("language", "en");
    localStorage.setItem("fontSize", "medium");
    localStorage.setItem("themeColor", "blue");

    setTimeout(() => window.location.reload(), 100);
  };

  const cardStyle = {
    backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
    color: darkMode ? "#fff" : "#000",
  };

  const dividerStyle = {
    marginBottom: "1rem",
    backgroundColor: darkMode ? "#444" : undefined,
  };

  const inputStyleProps = {
    InputLabelProps: { style: { color: "#fff" } },
    InputProps: { style: { color: "#fff" } },
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Grid container spacing={3} justifyContent="center">
        {/* USER PREFERENCES */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={cardStyle}>
            <CardContent>
              <Typography variant="h6" gutterBottom>User Preferences</Typography>
              <Divider style={dividerStyle} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <Typography>Dark Mode</Typography>
                <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <Typography>Enable Notifications</Typography>
                <Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
              </div>

              <FormControl fullWidth style={{ marginBottom: "1rem" }}>
                <InputLabel style={{ color: cardStyle.color }}>Language</InputLabel>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ color: cardStyle.color }}
                >
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth style={{ marginBottom: "1rem" }}>
                <InputLabel style={{ color: cardStyle.color }}>Font Size</InputLabel>
                <Select
                  value={fontSize}
                  onChange={(e) => {
                    setFontSize(e.target.value);
                    setTimeout(() => window.location.reload(), 100);
                  }}
                  style={{ color: cardStyle.color }}
                >
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel style={{ color: cardStyle.color }}>Theme Color</InputLabel>
                <Select
                  value={themeColor}
                  onChange={(e) => {
                    setThemeColor(e.target.value);
                    setTimeout(() => window.location.reload(), 100);
                  }}
                  style={{ color: cardStyle.color }}
                >
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="orange">Orange</MenuItem>
                  <MenuItem value="purple">Purple</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                onClick={() => setShowResetDialog(true)}
                style={{
                  marginTop: "1.5rem",
                  borderColor: themeColor,
                  color: themeColor,
                }}
              >
                Reset Preferences to Default
              </Button>

              <Dialog open={showResetDialog} onClose={() => setShowResetDialog(false)}>
                <DialogTitle>Reset Preferences</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to reset your preferences to default? This will override your current settings.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowResetDialog(false)} color="primary">Cancel</Button>
                  <Button
                    onClick={() => {
                      resetPreferences();
                      setShowResetDialog(false);
                    }}
                    color="error"
                  >
                    Confirm Reset
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>

        {/* ACCOUNT SETTINGS */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" style={cardStyle}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Account Settings</Typography>
              <Divider style={dividerStyle} />

              <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: "1rem" }} {...(darkMode && inputStyleProps)} />
              <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: "1rem" }} {...(darkMode && inputStyleProps)} />
              <Button variant="contained" color="primary" onClick={handleSaveAccount} style={{ marginRight: "1rem" }}>
                Save Changes
              </Button>
              {accountSaved && <Typography style={{ marginTop: "1rem", color: "green" }}>Changes saved!</Typography>}

              <Divider style={{ margin: "2rem 0 1rem" }} />
              <Typography variant="subtitle1" gutterBottom>Profile Picture</Typography>

              {profileImage ? (
                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                  <Avatar src={profileImage} alt="Profile" sx={{ width: 100, height: 100, margin: "0 auto" }} />
                  <Button size="small" onClick={() => setProfileImage("")} color="error" style={{ marginTop: "0.5rem" }}>
                    Remove Image
                  </Button>
                </div>
              ) : (
                <Button variant="outlined" component="label" style={{ marginBottom: "1rem" }}>
                  Upload Profile Picture
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfileImage(reader.result);
                          window.dispatchEvent(new Event("storage"));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </Button>
              )}

              <Divider style={{ margin: "2rem 0 1rem" }} />
              <Typography variant="subtitle1" gutterBottom>Change Password</Typography>
              <TextField fullWidth label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={{ marginBottom: "1rem" }} {...(darkMode && inputStyleProps)} />
              <TextField fullWidth label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ marginBottom: "1rem" }} {...(darkMode && inputStyleProps)} />
              <TextField fullWidth label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ marginBottom: "1rem" }} {...(darkMode && inputStyleProps)} />
              <Button variant="outlined" onClick={handleChangePassword}>Update Password</Button>
              {passwordMessage && (
                <Typography style={{ marginTop: "0.5rem", color: passwordMessage.includes("successfully") ? "green" : "red" }}>
                  {passwordMessage}
                </Typography>
              )}

              <Divider style={{ margin: "2rem 0 1rem" }} />
              <Button variant="contained" color="error" onClick={handleLogout} style={{ display: "block", marginBottom: "1rem" }}>
                Log Out
              </Button>
              <Button variant="outlined" color="error" onClick={() => { setDeletePassword(""); setDeleteError(""); setShowDeleteDialog(true); }}>
                Delete Account
              </Button>

              <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter your password to confirm. This will permanently delete your account and all preferences.
                  </DialogContentText>
                  <TextField
                    autoFocus margin="dense" label="Password" type="password"
                    fullWidth variant="outlined"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    error={!!deleteError}
                    helperText={deleteError}
                    {...(darkMode && inputStyleProps)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowDeleteDialog(false)} color="primary">Cancel</Button>
                  <Button
                    color="error"
                    onClick={() => {
                      const storedPassword = localStorage.getItem(`user_${username}`);
                      if (storedPassword === deletePassword) {
                        localStorage.clear();
                        setShowDeleteDialog(false);
                        window.location.href = "/signin";
                      } else {
                        setDeleteError("Incorrect password. Please try again.");
                      }
                    }}
                  >
                    Confirm Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Settings;
