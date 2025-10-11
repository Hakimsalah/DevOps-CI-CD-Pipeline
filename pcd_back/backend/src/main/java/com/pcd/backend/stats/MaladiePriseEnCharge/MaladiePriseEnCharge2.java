package com.pcd.backend.stats.MaladiePriseEnCharge;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table
public class MaladiePriseEnCharge2 {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique= true)
    private String disease;
    @Column(unique= true)
    private String acronym;
    private double percentage;

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }
}
