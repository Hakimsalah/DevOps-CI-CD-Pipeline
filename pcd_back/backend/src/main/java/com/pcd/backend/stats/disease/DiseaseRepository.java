package com.pcd.backend.stats.disease;


import org.springframework.data.jpa.repository.JpaRepository;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
        void deleteByName(String name); // Custom method
}