package com.pcd.backend.stats.selectionBar;

import java.io.Serializable;
import java.util.Objects;

public class UtilizationId implements Serializable {
    private String disinfectant;
    private String surface;
    private String service;
    private String year;

    public UtilizationId() {}

    public UtilizationId(String disinfectant, String surface, String service, String year) {
        this.disinfectant = disinfectant;
        this.surface = surface;
        this.service = service;
        this.year = year;
    }

    // hashCode and equals are required for composite keys
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UtilizationId)) return false;
        UtilizationId that = (UtilizationId) o;
        return Objects.equals(disinfectant, that.disinfectant) &&
                Objects.equals(surface, that.surface) &&
                Objects.equals(service, that.service) &&
                Objects.equals(year, that.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(disinfectant, surface, service, year);
    }
}
