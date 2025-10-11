package com.pcd.backend.stats.disease;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@RestController

public class DiseaseController {
    private final DiseaseRepository repo;

    public DiseaseController(DiseaseRepository repo) {
        this.repo = repo;
    }

    @PutMapping("/diseases/update/image/{id}")
    public ResponseEntity<String> uploadImage(
            @PathVariable("id") Long id,
            @RequestParam("image") MultipartFile imageFile) throws IOException {
        Disease disease = repo.findById(id).orElseThrow();
        // Convert the image file to a Base64 string
        String base64Image = Base64.getEncoder().encodeToString(imageFile.getBytes());
        disease.setImage(base64Image);
        repo.save(disease);
        return ResponseEntity.ok("Image uploaded");
    }

    @PutMapping("/diseases/update/{id}/{field}")
    public Disease updateNameOrDesc(
            @PathVariable("id") Long id,
            @PathVariable("field") String field,
            @RequestBody String fieldValue) {
        Disease disease = repo.findById(id).orElseThrow();
        if (Objects.equals(field, "name")) {
            disease.setName(fieldValue);
        } else {
            disease.setDescription(fieldValue);
        }
        return repo.save(disease);
    }

    @DeleteMapping("/diseases/delete/{id}")
    public void deleteDisease(@PathVariable("id") Long id) {
        repo.deleteById(id);
    }

    @GetMapping("/diseases")
    public List<Disease> getAllDiseases() {
        return repo.findAll();
    }

    @PostMapping("/diseases/add")
    public ResponseEntity<Disease> addDisease(@RequestBody Disease disease) {
        // Save the disease with the Base64 string as-is
        return ResponseEntity.ok(repo.save(disease));
    }

    @PostMapping("/diseases/delete/{name}")
    public void deleteDiseaseByName(@PathVariable("name") String name) {
        repo.deleteByName(name); // Assumes this method exists in the repository
    }
}