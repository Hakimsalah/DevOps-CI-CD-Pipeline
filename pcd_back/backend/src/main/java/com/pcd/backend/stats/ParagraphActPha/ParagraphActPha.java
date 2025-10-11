package com.pcd.backend.stats.ParagraphActPha;

import jakarta.persistence.*;

@Entity
@Table
public class ParagraphActPha {
    @Id
    @GeneratedValue
    private Long id;
    @Lob
    private String paragraph;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParagraph() {
        return paragraph;
    }

    public void setParagraph(String paragraph) {
        this.paragraph = paragraph;
    }
}
