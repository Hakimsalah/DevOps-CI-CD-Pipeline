package com.pcd.backend.stats.StaffPatientStats;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class StaffPatientStatsController {
    private final StaffPatientStatsRepository repo;

    public StaffPatientStatsController(StaffPatientStatsRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/StaffPatientStats")
    public List<StaffPatientStats> getStats()
    {
        return repo.findAll();
    }

    @PutMapping("/StaffPatientStats")
    public StaffPatientStats updateStats(@RequestBody StaffPatientStats s) {
        repo.deleteAll();
        return repo.save(s);
    }

}
