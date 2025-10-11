package com.pcd.backend.stats.selectionBar;

public class YearQuantityDTO {
    private String year;
    private Long quantity;

    public YearQuantityDTO(String year, Long quantity) {
        this.year = year;
        this.quantity = quantity;
    }

    // Getters and Setters
    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
}

