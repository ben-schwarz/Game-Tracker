package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "games")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    @Size(min = 1, max = 255, message = "Name must be between 1 and 255 characters")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Platform cannot be null")
    @Column(name = "platform")
    private String platform;

    @Min(value = 0, message = "Progress cannot be negative")
    @Max(value = 100, message = "Progress cannot exceed 100")
    @Column(name = "progress")
    private int progress;

    @Column(name = "playtime_minutes")
    private int playtimeMinutes;

    @Column(name = "achievements_total")
    private int achievementsTotal;

    @Column(name = "achievements_completed")
    private int achievementsCompleted;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "app_id")
    private Integer appId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public int getPlaytimeMinutes() {
        return playtimeMinutes;
    }

    public void setPlaytimeMinutes(int playtimeMinutes) {
        this.playtimeMinutes = playtimeMinutes;
    }

    public int getAchievementsTotal() {
        return achievementsTotal;
    }

    public void setAchievementsTotal(int achievementsTotal) {
        this.achievementsTotal = achievementsTotal;
    }

    public int getAchievementsCompleted() {
        return achievementsCompleted;
    }

    public void setAchievementsCompleted(int achievementsCompleted) {
        this.achievementsCompleted = achievementsCompleted;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getAppId() {
        return appId;
    }

    public void setAppId(Integer appId) {
        this.appId = appId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    @JsonIgnore
    public String getFormattedPlaytime() {
        if (playtimeMinutes < 60) {
            return playtimeMinutes + " minutes";
        }
        int hours = playtimeMinutes / 60;
        int minutes = playtimeMinutes % 60;
        return hours + " hours " + (minutes > 0 ? minutes + " minutes" : "");
    }

    @JsonIgnore
    public double getAchievementPercentage() {
        if (achievementsTotal == 0)
            return 0.0;
        return (double) achievementsCompleted / achievementsTotal * 100;
    }

    @PreUpdate
    @PrePersist
    protected void onCreate() {
        lastUpdated = LocalDateTime.now();
    }
}