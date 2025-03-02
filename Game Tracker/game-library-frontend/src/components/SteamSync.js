import { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

function SteamSync() {
  const [steamId, setSteamId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    setLoading(true);
    setMessage('');
    
    if (!steamId.trim()) {
      setMessage('Please enter a Steam ID');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting to sync with Steam ID:', steamId);
      const response = await axios.post(
        `http://localhost:8080/api/steam/sync/1?steamId=${steamId}`
      );
      console.log('Sync response:', response.data);
      setMessage(`Successfully synced ${response.data.data.length} games!`);
    } catch (error) {
      console.error('Sync error:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setMessage(`Error syncing games: ${errorMessage}. Please try again.`);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Sync Steam Library
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Enter your Steam64 ID or custom URL name
      </Typography>
      <TextField
        fullWidth
        label="Steam ID"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
        margin="normal"
        helperText="You can find your Steam ID in your profile URL"
      />
      <Button
        fullWidth
        variant="contained"
        onClick={handleSync}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Sync Games'}
      </Button>
      {message && (
        <Typography 
          sx={{ mt: 2 }} 
          color={message.includes('Error') ? 'error' : 'success'}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default SteamSync;