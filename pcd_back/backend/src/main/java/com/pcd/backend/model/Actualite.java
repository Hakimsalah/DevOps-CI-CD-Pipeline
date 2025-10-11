package com.pcd.backend.model;


import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Actualite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    @Temporal(TemporalType.DATE)
    private Date date;
    
    private String location;
    
    private String description;
    
    private String imagePath; // Chemin relatif de l'image
    
    

    // Constructeurs
    public Actualite() {}

    public Actualite(String title, Date date, String location, String imagePath, String description) {
        this.title = title;
        this.date = date;
        this.location = location;
        this.imagePath = imagePath;
        this.description = description;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
    
}
