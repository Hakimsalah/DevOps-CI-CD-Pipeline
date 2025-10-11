package com.pcd.backend.stats.patientDemographics;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class patientDemographicsController {
    private final patientDemographicsRepository repo;

    public patientDemographicsController(patientDemographicsRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/patientDemographics")
    public List<patientDemographics> getDemographics()
    {
        return repo.findAll();
    }
    
    @PutMapping("/patientDemographics")
    public patientDemographics updateDemographics(@RequestBody patientDemographics d)
    {
        repo.deleteAll();
        return repo.save(d);
    }
}
