package com.pcd.backend.stats.patientDemographics;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table
public class patientDemographics {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer category1;
    private Integer category2;
    private Integer category3;
    private Integer category4;
    private Integer category5;
    private String  description;

}
