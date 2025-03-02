package com.example.demo.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.entities.Game;
import com.example.demo.entities.User;
import com.example.demo.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.ArrayList;
import java.util.List;

@Service
public class SteamService {
    private static final Logger logger = LoggerFactory.getLogger(SteamService.class);

    @Value("${steam.api.key}")
    private String steamApiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final GameService gameService;
    private final UserService userService;

    public SteamService(GameService gameService, UserService userService) {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
        this.gameService = gameService;
        this.userService = userService;
    }

    private JsonNode getGameAchievements(String steamId, int appId) {
        String url = String.format(
                "http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?appid=%d&key=%s&steamid=%s",
                appId, steamApiKey, steamId);

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            return root.path("playerstats");
        } catch (Exception e) {
            logger.warn("Failed to get achievements for game {}: {}", appId, e.getMessage());
            return null;
        }
    }

    private String getGameImageUrl(int appId) {
        return String.format("https://cdn.cloudflare.steamstatic.com/steam/apps/%d/header.jpg", appId);
    }

    public List<Game> syncSteamLibrary(String steamId, Long userId) {
        logger.info("Starting Steam library sync for steamId: {} and userId: {}", steamId, userId);

        User user = userService.getUserById(userId);
        if (user == null) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        String url = String.format(
                "http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=%s&steamid=%s&format=json&include_appinfo=1",
                steamApiKey, steamId);

        try {
            logger.debug("Calling Steam API with URL: {}", url);
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);
            JsonNode gamesNode = root.path("response").path("games");

            if (!gamesNode.isArray()) {
                logger.error("Invalid response format from Steam API");
                throw new RuntimeException("Invalid response format from Steam API");
            }

            // Delete existing games for this user
            gameService.getAllGames().stream()
                    .filter(g -> g.getUser() != null && g.getUser().getId().equals(userId))
                    .forEach(g -> gameService.deleteGame(g.getId()));

            List<Game> syncedGames = new ArrayList<>();

            for (JsonNode gameNode : gamesNode) {
                String gameName = gameNode.path("name").asText();
                int appId = gameNode.path("appid").asInt();
                int playtimeMinutes = gameNode.path("playtime_forever").asInt();

                if (gameName != null && !gameName.isEmpty()) {
                    Game game = new Game();
                    game.setName(gameName);
                    game.setPlatform("Steam");
                    game.setPlaytimeMinutes(playtimeMinutes);
                    game.setUser(user);
                    game.setAppId(appId);
                    game.setImageUrl(getGameImageUrl(appId));

                    // Get achievements
                    JsonNode achievements = getGameAchievements(steamId, appId);
                    if (achievements != null && !achievements.path("achievements").isMissingNode()) {
                        int total = 0;
                        int completed = 0;
                        for (JsonNode achievement : achievements.path("achievements")) {
                            total++;
                            if (achievement.path("achieved").asInt() == 1) {
                                completed++;
                            }
                        }
                        game.setAchievementsTotal(total);
                        game.setAchievementsCompleted(completed);
                    }

                    Game savedGame = gameService.saveGame(game);
                    syncedGames.add(savedGame);

                    logger.debug("Synced game: {} (appId: {}) with playtime: {} minutes, achievements: {}/{}",
                            gameName, appId, playtimeMinutes, game.getAchievementsCompleted(),
                            game.getAchievementsTotal());
                }
            }

            logger.info("Successfully synced {} games from Steam", syncedGames.size());
            return syncedGames;

        } catch (Exception e) {
            logger.error("Failed to sync Steam library: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to sync Steam library: " + e.getMessage(), e);
        }
    }

    public JsonNode getSteamUserProfile(String steamId) {
        String url = String.format(
                "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=%s&steamids=%s",
                steamApiKey, steamId);

        try {
            String response = restTemplate.getForObject(url, String.class);
            return objectMapper.readTree(response)
                    .path("response")
                    .path("players")
                    .path(0);
        } catch (Exception e) {
            logger.error("Failed to get Steam user profile", e);
            throw new RuntimeException("Failed to get Steam user profile: " + e.getMessage(), e);
        }
    }
}