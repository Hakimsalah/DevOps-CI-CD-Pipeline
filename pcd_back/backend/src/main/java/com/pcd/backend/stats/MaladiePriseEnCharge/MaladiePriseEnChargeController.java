package com.pcd.backend.stats.MaladiePriseEnCharge;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MaladiePriseEnChargeController {
    private final MaladiePriseEnChargeRepository repo;

    public MaladiePriseEnChargeController(MaladiePriseEnChargeRepository repo) {
        this.repo = repo;
    }

    @PutMapping("/MaladiePriseEnCharge/batch")
    public List<MaladiePriseEnCharge> addDiseases(@RequestBody List<MaladiePriseEnCharge> diseases)
    {
        repo.deleteAll();
        return repo.saveAll(diseases);
    }

    @GetMapping("/MaladiePriseEnCharge")
    public List<MaladiePriseEnCharge> getDiseases()
    {
        return repo.findAll();
    }





}
