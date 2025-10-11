package com.pcd.backend.stats.TransAct;

import jakarta.persistence.*;

@Entity
@Table
public class TransAct {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique= true)
    private Integer Year;
    private Integer nbAllographs;
    private Integer nbAutographs;

    public Integer getYear() {
        return Year;
    }

    public void setYear(Integer year) {
        Year = year;
    }

    public Integer getNbAllographs() {
        return nbAllographs;
    }

    public void setNbAllographs(Integer nbAllographs) {
        this.nbAllographs = nbAllographs;
    }

    public Integer getNbAutographs() {
        return nbAutographs;
    }

    public void setNbAutographs(Integer nbAutographs) {
        this.nbAutographs = nbAutographs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
