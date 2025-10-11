package com.pcd.backend.stats.germ;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@RestController

public class GermController {
    private final GermRepository repo;

    public GermController(GermRepository repo) {
        this.repo = repo;
    }

    @PutMapping("/germs/update/image/{id}")
    public ResponseEntity<String> uploadImage(
            @PathVariable("id") Long id,
            @RequestParam("image") MultipartFile imageFile) throws IOException {
        Germ disease = repo.findById(id).orElseThrow();
        // Convert the image file to a Base64 string
        String base64Image = Base64.getEncoder().encodeToString(imageFile.getBytes());
        disease.setImage(base64Image);
        repo.save(disease);
        return ResponseEntity.ok("Image uploaded");
    }

    @PutMapping("/germs/update/{id}/{field}")
    public Germ updateNameOrDesc(
            @PathVariable("id") Long id,
            @PathVariable("field") String field,
            @RequestBody String fieldValue) {
        Germ disease = repo.findById(id).orElseThrow();
        if (Objects.equals(field, "name")) {
            disease.setName(fieldValue);
        } else {
            disease.setDescription(fieldValue);
        }
        return repo.save(disease);
    }

    @DeleteMapping("/germs/delete/{id}")
    public void deleteGerm(@PathVariable("id") Long id) {
        repo.deleteById(id);
    }

    @GetMapping("/germs")
    public List<Germ> getAllGerms() {
        return repo.findAll();
    }

    @PostMapping("/germs/add")
    public ResponseEntity<Germ> addGerm(@RequestBody Germ germ) {
        // Save the germ with the Base64 string as-is
        return ResponseEntity.ok(repo.save(germ));
    }

    @PostMapping("/germs/delete/{name}")
    public void deleteGermByName(@PathVariable("name") String name) {
        repo.deleteByName(name); // Assumes this method exists in the repository
    }
}