package com.pcd.backend.stats.MaladiePriseEnCharge;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MaladiePriseEnCharge2Controller {
    private final MaladiePriseEnCharge2Repository repo;

    public MaladiePriseEnCharge2Controller(MaladiePriseEnCharge2Repository repo) {
        this.repo = repo;
    }

    @PutMapping("/MaladiePriseEnCharge2/batch")
    public List<MaladiePriseEnCharge2> addDiseases(@RequestBody List<MaladiePriseEnCharge2> diseases)
    {
        repo.deleteAll();
        return repo.saveAll(diseases);
    }

    @GetMapping("/MaladiePriseEnCharge2")
    public List<MaladiePriseEnCharge2> getDiseases()
    {
        return repo.findAll();
    }





}
