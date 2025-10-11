package com.pcd.backend.membre_proj_crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/membre_proj")
public class MbreProjController {
    @Autowired
    private MbreProjService service;

    //Methode d ajouter un membre de projet
    @PostMapping(value = "/create", consumes = "multipart/form-data")
    public ResponseEntity<MbreProj> createMembre(
            @RequestParam("nom") String nom,
            @RequestParam("bio") String bio,
            @RequestParam("profession") String profession,
            @RequestParam("linkFb") String linkFb,
            @RequestParam("linkInsta") String linkInsta,
            @RequestParam("linkLin") String linkLin,
            @RequestParam("img") MultipartFile img
    ) throws IOException {
        MbreProj savedMembre = service.createMembre( nom, profession, linkFb, linkInsta, linkLin, img, bio);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMembre);

    }

    // Méthode pour supprimer un membre et son image
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMembre(@PathVariable Long id) {
        service.deleteMembre(id);
        return ResponseEntity.noContent().build();
    }

    //not protected because this endpoint is used for desplaying the members in the homePage
    @GetMapping("/all")
    public ResponseEntity<List<MbreProj>> getAllMembres() {
        List<MbreProj> membres = service.getAllMembres();
        return ResponseEntity.ok(membres);
    }

}
