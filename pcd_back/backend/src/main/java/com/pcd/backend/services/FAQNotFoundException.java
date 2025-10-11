package com.pcd.backend.services;

public class FAQNotFoundException extends RuntimeException {
    public FAQNotFoundException(String message) {
        super(message);
    }
}