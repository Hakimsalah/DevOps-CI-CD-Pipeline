package com.pcd.backend.stats.ParagraphActPha;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ParagraphActPhaController {
    private final ParagraphActPhaRepository repo;

    public ParagraphActPhaController(ParagraphActPhaRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/ParagraphActPha")
    public List<ParagraphActPha> getData()
    {
        return repo.findAll();
    }

    @PutMapping("/ParagraphActPha")
    public ParagraphActPha updataData(@RequestBody ParagraphActPha p)
    {
        repo.deleteAll();
        return repo.save(p);
    }
}
