import React, { useState } from "react";
import axios from "axios";

function AddGame() {
  const [name, setName] = useState("");
  const [playtime, setPlaytime] = useState(0);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:8080/api/games/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data; // Return the uploaded image URL
    } catch (error) {
      console.error("Image upload failed:", error);
      setMessage("Failed to upload image.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await handleImageUpload();
    if (!imageUrl) return;

    const gameData = {
      name,
      playtimeMinutes: playtime,
      imageUrl,
      platform: "Manual", // Indicate that this game was added manually
    };

    try {
      const response = await axios.post("http://localhost:8080/api/games/add", gameData);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Failed to add game:", error);
      setMessage("Failed to add game.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add a Game</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Game Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Playtime (minutes)"
          value={playtime}
          onChange={(e) => setPlaytime(e.target.value)}
          required
        />
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <br />
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
}

export default AddGame;
