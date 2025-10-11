package com.pcd.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pcd.backend.model.FAQ;
import com.pcd.backend.model.MessageContact;
import com.pcd.backend.repository.MessageContactRepository;

@Service
public class MessageContactService {

    @Autowired
    private MessageContactRepository repository;

    public MessageContact saveMessage(MessageContact message) {
        return repository.save(message);
    }
    
    public List<MessageContact> getAllFAQs() {
        return repository.findAll();
    }
}