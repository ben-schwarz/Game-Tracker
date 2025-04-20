import React from "react";
import { Typography, Card, CardContent, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function About() {
    const theme = useTheme();

    return (
        <Container maxWidth="md" style={{ marginTop: "2rem" }}>
            <Card elevation={3}>
                <CardContent>
                    <Typography
                        variant="h3"
                        gutterBottom
                        style={{ fontWeight: "bold", color: theme.palette.primary.main }}
                    >
                        About Game Tracker
                    </Typography>

                    <Typography
                        variant="body1"
                        paragraph
                        style={{ fontSize: "1.1rem", lineHeight: "1.75" }}
                    >
                        Game Tracker is a personal game library and activity dashboard built
                        by a team of developers passionate about simplifying game tracking.
                        Our mission is to create a tool that empowers players to take control
                        of their gaming habits and personalize their experience.
                    </Typography>

                    <Typography
                        variant="body1"
                        paragraph
                        style={{ fontSize: "1.1rem", lineHeight: "1.75" }}
                    >
                        This app was built using React and Material UI, with a strong focus
                        on user experience, visual accessibility, and client-side privacy.
                        From dark mode support to custom font sizing and themes, Game Tracker
                        puts personalization first.
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default About;
