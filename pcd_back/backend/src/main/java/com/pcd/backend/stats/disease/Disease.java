package com.pcd.backend.stats.disease;

import jakarta.persistence.*;
@Entity
public class Disease {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String image; // Changed to String for Base64 data

    private String description;

    // Constructors
    public Disease() {}

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}