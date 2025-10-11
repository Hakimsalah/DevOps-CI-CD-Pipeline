package com.pcd.backend.membre_proj_crud;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class MbreProjService {

    private final String UPLOAD_DIR = "uploads/";

    @Autowired
    private MbreProjRepository repo;

    //methode de creer membre de projet
    public MbreProj createMembre(String nom, String profession, String linkFb, String linkInsta, String linkLin, MultipartFile img,String bio) throws IOException {
        // Créer le dossier uploads s'il n'existe pas
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
        // Nom du fichier image
        String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(img.getOriginalFilename());
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        // Sauvegarder l'image dans le dossier
        Files.copy(img.getInputStream(), filePath);

        // Créer le membre et enregistrer le chemin de l'image
        MbreProj membre = new MbreProj();
        membre.setNom(nom);
        membre.setProfession(profession);
        membre.setLinkFb(linkFb);
        membre.setLinkInsta(linkInsta);
        membre.setLinkLin(linkLin);
        membre.setBio(bio);
        membre.setImgPath(fileName); // Sauvegarder le chemin de l'image

        // Sauvegarder dans la base de données
        return repo.save(membre);
    }



    public void deleteMembre(Long id) {
        Optional<MbreProj> membreOpt = repo.findById(id);
        if (membreOpt.isPresent()) {
            String imgPath = membreOpt.get().getImgPath();
            Path imagePath = Paths.get(UPLOAD_DIR + imgPath);
            File imageFile = imagePath.toFile();

            // Supprimer le fichier image du dossier
            if (imageFile.exists()) {
                imageFile.delete();
            }

            repo.deleteById(id);
        }
    }


    // Méthode pour récupérer tous les membres
    public List<MbreProj> getAllMembres() {
        return repo.findAll();
    }






}
