package com.pcd.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.pcd.backend.model.Actualite;
import com.pcd.backend.services.ActualiteService;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/actualites")

public class ActualiteController {
    @Autowired
    private ActualiteService service;

    @GetMapping
    public List<Actualite> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Actualite getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Actualite create(
            @RequestParam String title,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date,
            @RequestParam String location,
            @RequestParam String descripation,
            @RequestParam(required = false) MultipartFile image) throws IOException {
        
        Actualite actualite = new Actualite();
        actualite.setTitle(title);
        actualite.setDate(date);
        actualite.setLocation(location);
        actualite.setDescription(descripation);;
        
        return service.create(actualite, image);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Path path = Paths.get("uploads/" + filename);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}