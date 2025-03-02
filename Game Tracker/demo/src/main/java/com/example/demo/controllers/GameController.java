package com.example.demo.controllers;

import com.example.demo.dto.ApiResponse;
import com.example.demo.entities.Game;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Game>>> getAllGames() {
        List<Game> games = gameService.getAllGames();
        return ResponseEntity.ok(new ApiResponse<>(games, "Games retrieved successfully", true));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Game>> getGameById(@PathVariable Long id) {
        Game game = gameService.getGameById(id);
        if (game == null) {
            throw new ResourceNotFoundException("Game not found with id: " + id);
        }
        return ResponseEntity.ok(new ApiResponse<>(game, "Game retrieved successfully", true));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Game>> createGame(@RequestBody Game game) {
        Game savedGame = gameService.saveGame(game);
        return ResponseEntity.ok(new ApiResponse<>(savedGame, "Game created successfully", true));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return ResponseEntity.ok(new ApiResponse<>(null, "Game deleted successfully", true));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Game>> updateGame(@PathVariable Long id, @RequestBody Game game) {
        Game existingGame = gameService.getGameById(id);
        if (existingGame == null) {
            throw new ResourceNotFoundException("Game not found with id: " + id);
        }
        game.setId(id);
        Game updatedGame = gameService.saveGame(game);
        return ResponseEntity.ok(new ApiResponse<>(updatedGame, "Game updated successfully", true));
    }
}