package com.pcd.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcd.backend.model.Actualite;

public interface ActualiteRepository extends JpaRepository<Actualite, Long> {
}
