package com.pcd.backend.stats.MaladiePriseEnCharge;

import jakarta.persistence.*;
@Entity
@Table
public class MaladiePriseEnCharge {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique= true)
    private String disease;
    @Column(unique= true)
    private String acronym;
    private double percentage;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }
}
