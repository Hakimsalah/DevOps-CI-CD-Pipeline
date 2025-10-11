package com.pcd.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pcd.backend.model.Actualite;
import com.pcd.backend.repository.ActualiteRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ActualiteService {
    @Autowired
    private ActualiteRepository repository;

    private final String UPLOAD_DIR = "uploads/";

    public List<Actualite> getAll() {
        return repository.findAll();
    }

    public Actualite getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Actualite create(Actualite actualite, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = saveImage(imageFile);
            actualite.setImagePath(fileName);
        }
        return repository.save(actualite);
    }

    private String saveImage(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());
        return fileName;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}