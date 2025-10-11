package com.pcd.backend.stats.selectionBar;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class UtilizationController {

    private final UtilizationRepository repo;

    public UtilizationController(UtilizationRepository repo) {
        this.repo = repo;
    }


    public Map<String, List<?>> getMetadataAsMap() {
        List<Object[]> rawData = repo.getInfos();

        Set<String> years = new TreeSet<>(Comparator.reverseOrder());
        Set<String> disinfectants = new TreeSet<>();
        Set<String> services = new TreeSet<>();
        Set<String> surfaces = new TreeSet<>();

        for (Object[] row : rawData) {
            disinfectants.add((String) row[0]);
            services.add((String) row[1]);
            surfaces.add((String) row[2]);
            years.add((String) row[3]);
        }

        Map<String, List<?>> result = new HashMap<>();
        result.put("years", new ArrayList<>(years));
        result.put("disinfectants", new ArrayList<>(disinfectants));
        result.put("services", new ArrayList<>(services));
        result.put("surfaces", new ArrayList<>(surfaces));

        return result;
    }


    @GetMapping("/utilizations/Lists")
    public Map<String, List<?>> getLists ()
    {
        return getMetadataAsMap();
    }

    @PostMapping("/utilizations/add")
    public Utilization addUtilization(@RequestBody Utilization u) {
        return repo.save(u);
    }

    @DeleteMapping("/utilizations/delete")
    public void deleteUtils(@RequestParam("year") String year) {
        repo.deleteByYear(year); // Fixed method name to match repository
    }

    @GetMapping("/utilizations")
    public List<Object[]> AllHandler(
            @RequestParam(required = false) String disinf,
            @RequestParam(required = false) String service,
            @RequestParam(required = false) String surface,
            @RequestParam(required = false) String year
    ) {
        if ("Year".equals(year)) {
            if (!"Surface".equals(surface) && !"Service".equals(service)) {
                return repo.quantityYearDisinfectantServiceSurface(disinf, service, surface);
            } else if (!"Surface".equals(surface)) {
                return repo.quantityYearDisinfectantSurface(disinf, surface);
            } else if (!"Service".equals(service)) {
                return repo.quantityYearDisinfectantService(disinf, service);
            } else {
                return repo.quantityUsedOfDisinfectant(disinf);
            }
        } else {
            if ("Disinfectant".equals(disinf)) {
                if (! "Service".equals(service) &&  "Surface".equals(surface)) {
                    return repo.getYearStatsPerService(year, service);
                } else if (! "Surface".equals(surface) && "Service".equals(service)) {
                    return repo.getYearStatsPerSurface(year, surface);
                } else  {
                    return repo.getYearStats(year);
                }
            } else {
                if (!"Surface".equals(surface)) {
                    return repo.findQuantityPerServiceYearFixed(disinf, surface, year);
                } else if (!"Service".equals(service)) {
                    return repo.findQuantityPerSurfaceYearFixed(disinf, service, year);
                } else {
                    return repo.quantityUsedOfDisinfectantThisYear(disinf, year);
                }
            }
        }

    }}