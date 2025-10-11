package com.pcd.backend.stats.StaffPatientStats;

import jakarta.persistence.*;
@Entity
@Table
public class StaffPatientStats {
    @Id
    @GeneratedValue
    private Integer id ;
    private Integer doctors;
    private Integer nurses;
    private Integer patients;
    @Version
    private Long version;
    public Integer getDoctors() {
        return doctors;
    }

    public void setDoctors(Integer doctors) {
        this.doctors = doctors;
    }

    public Integer getNurses() {
        return nurses;
    }

    public void setNurses(Integer nurses) {
        this.nurses = nurses;
    }

    public Integer getPatients() {
        return patients;
    }

    public void setPatients(Integer patients) {
        this.patients = patients;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
