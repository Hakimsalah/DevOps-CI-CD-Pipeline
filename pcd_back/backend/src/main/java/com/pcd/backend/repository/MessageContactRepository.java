package com.pcd.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.pcd.backend.model.MessageContact;

public interface MessageContactRepository extends JpaRepository<MessageContact, Long> {
}