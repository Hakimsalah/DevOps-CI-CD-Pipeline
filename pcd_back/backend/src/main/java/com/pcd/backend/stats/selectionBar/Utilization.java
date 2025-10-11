package com.pcd.backend.stats.selectionBar;

import jakarta.persistence.*;

@Entity
@Table
@IdClass(UtilizationId.class)
public class Utilization {
    @Id
    private String disinfectant;
    @Id
    private String surface;
    @Id
    private String service;
    private Long quantity;
    @Id
    private String year;


    public String getDisinfectant() {
        return disinfectant;
    }

    public void setDisinfectant(String disinfectant) {
        this.disinfectant = disinfectant;
    }

    public String getSurface() {
        return surface;
    }

    public void setSurface(String surface) {
        this.surface = surface;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
