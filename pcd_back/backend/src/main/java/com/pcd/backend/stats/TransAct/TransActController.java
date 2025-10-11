package com.pcd.backend.stats.TransAct;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TransActController {
    private final TransActRepository repo;

    public TransActController(TransActRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/TransAct")
    public List<TransAct> getData()
    {
        return repo.findAll();
    }

    @PutMapping("/TransAct")
    public TransAct addData(@RequestBody TransAct t )
    {
        return repo.save(t);
    }

    @PutMapping("/TransAct/batch")
    public List<TransAct> addDataBatch(@RequestBody  List<TransAct> ListTrans )
    {
        return repo.saveAll(ListTrans);
    }
}
