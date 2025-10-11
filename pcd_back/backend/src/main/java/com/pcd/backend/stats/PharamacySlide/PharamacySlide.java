package com.pcd.backend.stats.PharamacySlide;

import jakarta.persistence.*;

@Entity
@Table
public class PharamacySlide {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique=true)
    private String description;
    @Column(columnDefinition = "TEXT")
    private String image; // Changed to String for Base64 data

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
