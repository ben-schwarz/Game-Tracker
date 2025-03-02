import { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

function GameLibrary() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/games')
      .then(response => {
        setGames(response.data.data);
      })
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {games.map(game => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={game.imageUrl}
                alt={game.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {game.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Playtime: {Math.floor(game.playtimeMinutes / 60)} hours
                </Typography>
                {game.achievementsTotal > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Achievements: {game.achievementsCompleted}/{game.achievementsTotal}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GameLibrary;