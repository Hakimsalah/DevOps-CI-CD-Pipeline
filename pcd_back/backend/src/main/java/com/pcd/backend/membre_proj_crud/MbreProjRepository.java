package com.pcd.backend.membre_proj_crud;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MbreProjRepository extends JpaRepository<MbreProj, Long> {
}
