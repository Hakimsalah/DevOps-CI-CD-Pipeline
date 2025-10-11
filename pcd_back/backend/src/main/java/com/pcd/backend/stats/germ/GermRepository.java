package com.pcd.backend.stats.germ;


import org.springframework.data.jpa.repository.JpaRepository;

public interface GermRepository extends JpaRepository<Germ, Long> {
    void deleteByName(String name); // Custom method
}