package com.pcd.backend.services;

import com.pcd.backend.model.Document;
import com.pcd.backend.repository.DocumentRepository;
import com.pcd.backend.utils.DocumentUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DocumentStorageService {

    @Autowired
    private DocumentRepository repository;

    public String uploadDocument(MultipartFile file) throws IOException {
        Document document = Document.builder()
                .title(file.getOriginalFilename())
                .type(file.getContentType())
                .description("Uploaded document: " + file.getOriginalFilename())
                .content(DocumentUtils.compressDocument(file.getBytes()))
                .build();

        Document savedDocument = repository.save(document);
        
        if (savedDocument != null) {
            return "Document uploaded successfully: " + file.getOriginalFilename() + " (ID: " + savedDocument.getId() + ")";
        }
        return null;
    }

    public byte[] downloadDocument(Long id) {
        Optional<Document> dbDocument = repository.findById(id);
        return dbDocument.map(document -> DocumentUtils.decompressDocument(document.getContent()))
                .orElse(null);
    }

    public byte[] downloadDocumentByTitle(String fileName) {
        Optional<Document> dbDocument = repository.findByTitle(fileName);
        return dbDocument.map(document -> DocumentUtils.decompressDocument(document.getContent()))
                .orElse(null);
    }

    public Document getDocumentMetadata(Long id) {
        return repository.findById(id).orElse(null);
    }
    public void deleteDocument(Long id) {
        repository.deleteById(id);
    }
    
    public List<Document> getAllDocumentsMetadata() {
        List<Document> documents = repository.findAll();
        
        // Nettoyer le contenu des documents pour ne retourner que les métadonnées
        return documents.stream()
                .map(document -> {
                    // Créer une copie du document sans le contenu
                    Document metadata = new Document();
                    metadata.setId(document.getId());
                    metadata.setTitle(document.getTitle());
                    metadata.setDescription(document.getDescription());
                    metadata.setType(document.getType());
                    // Ne pas inclure le content
                    return metadata;
                })
                .collect(Collectors.toList());
    }
}
