package com.pcd.backend.stats.PharamacySlide;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PharamacySlideController {
    private final PharamacySlideRepository repo;

    public PharamacySlideController(PharamacySlideRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/PharamacySlide")
    public List<PharamacySlide> getData()
    {
        return repo.findAll();
    }

    @PutMapping("/PharamacySlide/batch")
    public List<PharamacySlide> updateData(@RequestBody List<PharamacySlide> s )
    {
        return repo.saveAll(s);
    }
}
