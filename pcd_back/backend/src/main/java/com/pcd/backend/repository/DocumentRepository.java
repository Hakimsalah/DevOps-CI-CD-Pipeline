package com.pcd.backend.repository;

import com.pcd.backend.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<Document> findByTitle(String fileName);
}