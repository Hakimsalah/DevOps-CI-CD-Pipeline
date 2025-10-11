package com.pcd.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.pcd.backend.model.MessageContact;
import com.pcd.backend.services.MessageContactService;


@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private MessageContactService service;
    
    @GetMapping
    public List<MessageContact> getAllFAQs() {
        return service.getAllFAQs();
    }


    @PostMapping
    public MessageContact receiveMessage(@RequestBody MessageContact message) {
        return service.saveMessage(message);
    }
}