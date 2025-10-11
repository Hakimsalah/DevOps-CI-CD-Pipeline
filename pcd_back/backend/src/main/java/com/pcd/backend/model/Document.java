package com.pcd.backend.model;

import jakarta.persistence.*;
import lombok.Builder;

@Entity
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String type;
    
    @Lob
    @Column(length = 10485760) // 10MB max
    private byte[] content;

    // Constructeurs, getters et setters
    public Document() {
    }

    public Document(Long id, String title, String description, String type, byte[] content) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.content = content;
    }

    // Getters et setters existants...
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	
}