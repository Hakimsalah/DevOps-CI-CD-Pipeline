package com.pcd.backend.controller;

import com.pcd.backend.model.Document;
import com.pcd.backend.services.DocumentStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentStorageService storageService;

    @PostMapping
    public ResponseEntity<String> uploadDocument(@RequestParam("document") MultipartFile file) throws IOException {
        try {
            String response = storageService.uploadDocument(file);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Could not upload the document: " + file.getOriginalFilename());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Document>> getAllDocumentsMetadata() {
        List<Document> documents = storageService.getAllDocumentsMetadata();
        documents.forEach(doc -> doc.setContent(null));
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long id) {
        Document document = storageService.getDocumentMetadata(id);
        if (document == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] content = storageService.downloadDocument(id);
        if (content == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(document.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getTitle() + "\"")
                .body(content);
    }

    @GetMapping("/metadata/{id}")
    public ResponseEntity<Document> getDocumentMetadata(@PathVariable Long id) {
        Document document = storageService.getDocumentMetadata(id);
        if (document == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Ne pas renvoyer le contenu dans les métadonnées
        document.setContent(null);
        return ResponseEntity.ok()
                .body(document);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {
        try {
            storageService.deleteDocument(id);
            return ResponseEntity.ok("Document supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la suppression du document");
        }
    }
}