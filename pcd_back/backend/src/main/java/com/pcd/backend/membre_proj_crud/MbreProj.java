package com.pcd.backend.membre_proj_crud;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
    public class MbreProj {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String nom;
        private String profession;
        private String linkFb;
        private String linkInsta;
        private String linkLin;

        private String bio;
        private String imgPath;
    }
