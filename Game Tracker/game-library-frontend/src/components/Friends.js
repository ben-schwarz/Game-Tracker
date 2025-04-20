import React, { useEffect, useState } from "react";
import {
    Typography,
    Card,
    CardContent,
    Container,
    TextField,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    useTheme,
} from "@mui/material";
import { useAuth } from "./AuthContext";
import { generateFriendCode } from "../utils/friendCode";

function Friends() {
    const theme = useTheme();
    const { currentUser } = useAuth();
    const [friendCode, setFriendCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [friends, setFriends] = useState([]);
    const [newFriendCode, setNewFriendCode] = useState("");

    const userKey = currentUser?.username || "guest";

    useEffect(() => {
        if (!currentUser?.username) return;

        // Load or generate friend code
        const codeKey = `friendCode_${userKey}`;
        let code = localStorage.getItem(codeKey);

        if (!code) {
            code = generateFriendCode(userKey);
            localStorage.setItem(codeKey, code);
        }
        setFriendCode(code);

        // Load existing friends
        const savedFriends = JSON.parse(localStorage.getItem(`friends_${userKey}`)) || [];
        setFriends(savedFriends);
    }, [currentUser]);

    const handleCopy = () => {
        navigator.clipboard.writeText(friendCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAddFriend = () => {
        if (!newFriendCode.trim()) return;

        if (friends.includes(newFriendCode)) {
            alert("You’ve already added this friend.");
            return;
        }

        const updatedFriends = [...friends, newFriendCode];
        setFriends(updatedFriends);
        localStorage.setItem(`friends_${userKey}`, JSON.stringify(updatedFriends));
        setNewFriendCode("");
    };

    const cardStyle = {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
            <Card elevation={3} style={cardStyle}>
                <CardContent>
                    <Typography variant="h4" gutterBottom color="primary">
                        Friends
                    </Typography>

                    {/* Friend Code */}
                    <Typography variant="body1" gutterBottom>
                        Your friend code:
                    </Typography>
                    <Box display="flex" gap={1} alignItems="center" mb={2}>
                        <TextField
                            value={friendCode}
                            fullWidth
                            disabled
                            InputProps={{ style: { color: theme.palette.text.primary } }}
                        />
                        <Button variant="outlined" onClick={handleCopy} color="primary">
                            {copied ? "Copied!" : "Copy"}
                        </Button>
                    </Box>

                    {/* Add Friend */}
                    <Typography variant="body1" gutterBottom>
                        Add a friend by code:
                    </Typography>
                    <Box display="flex" gap={1} alignItems="center" mb={2}>
                        <TextField
                            value={newFriendCode}
                            onChange={(e) => setNewFriendCode(e.target.value)}
                            placeholder="Enter friend code"
                            fullWidth
                            InputProps={{ style: { color: theme.palette.text.primary } }}
                        />
                        <Button variant="contained" onClick={handleAddFriend} color="primary">
                            Add
                        </Button>
                    </Box>

                    {/* Friend List */}
                    <Typography variant="body1" gutterBottom>
                        Your friends:
                    </Typography>
                    {friends.length > 0 ? (
                        <List>
                            {friends.map((code, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={code} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography color="text.secondary">You haven’t added any friends yet.</Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

export default Friends;
