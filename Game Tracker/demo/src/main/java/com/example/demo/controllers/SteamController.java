package com.example.demo.controllers;

import com.example.demo.dto.ApiResponse;
import com.example.demo.entities.Game;
import com.example.demo.services.SteamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.List;

@RestController
@RequestMapping("/api/steam")
public class SteamController {
    private static final Logger logger = LoggerFactory.getLogger(SteamController.class);
    private final SteamService steamService;

    @Autowired
    public SteamController(SteamService steamService) {
        this.steamService = steamService;
    }

    @PostMapping("/sync/{userId}")
    public ResponseEntity<ApiResponse<List<Game>>> syncSteamLibrary(
            @PathVariable Long userId,
            @RequestParam String steamId) {
        try {
            logger.info("Starting Steam library sync request - UserId: {}, SteamId: {}", userId, steamId);

            if (steamId == null || steamId.trim().isEmpty()) {
                logger.error("Steam ID is empty or null");
                return ResponseEntity.badRequest().body(new ApiResponse<>(
                        null,
                        "Steam ID cannot be empty",
                        false));
            }

            List<Game> syncedGames = steamService.syncSteamLibrary(steamId, userId);

            logger.info("Successfully synced {} games for user {}", syncedGames.size(), userId);

            return ResponseEntity.ok(new ApiResponse<>(
                    syncedGames,
                    String.format("Successfully synced %d games from Steam", syncedGames.size()),
                    true));

        } catch (Exception e) {
            logger.error("Failed to sync Steam library - UserId: {}, SteamId: {}, Error: {}",
                    userId, steamId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body(new ApiResponse<>(
                    null,
                    "Failed to sync Steam library: " + e.getMessage(),
                    false));
        }
    }

    @GetMapping("/profile/{steamId}")
    public ResponseEntity<ApiResponse<JsonNode>> getSteamProfile(
            @PathVariable String steamId) {
        try {
            logger.info("Fetching Steam profile for SteamId: {}", steamId);
            JsonNode profile = steamService.getSteamUserProfile(steamId);

            if (profile.isEmpty()) {
                logger.warn("No profile found for SteamId: {}", steamId);
                return ResponseEntity.notFound().build();
            }

            logger.info("Successfully retrieved Steam profile for SteamId: {}", steamId);
            return ResponseEntity.ok(new ApiResponse<>(
                    profile,
                    "Steam profile retrieved successfully",
                    true));

        } catch (Exception e) {
            logger.error("Failed to fetch Steam profile - SteamId: {}, Error: {}",
                    steamId, e.getMessage(), e);
            return ResponseEntity.internalServerError().body(new ApiResponse<>(
                    null,
                    "Failed to fetch Steam profile: " + e.getMessage(),
                    false));
        }
    }
}