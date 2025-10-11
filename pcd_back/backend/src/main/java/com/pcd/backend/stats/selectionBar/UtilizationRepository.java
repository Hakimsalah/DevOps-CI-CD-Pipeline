package com.pcd.backend.stats.selectionBar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UtilizationRepository extends JpaRepository<Utilization, UtilizationId> {

    void deleteByYear(String year);

    @Query("SELECT u.service, u.quantity " +
            "FROM Utilization u " +
            "WHERE u.disinfectant = :disinf AND u.surface = :surface AND u.year = :year")
    List<Object[]> findQuantityPerServiceYearFixed(String disinf, String surface, String year);

    @Query("SELECT u.surface, u.quantity " +
            "FROM Utilization u " +
            "WHERE u.disinfectant = :disinf AND u.service = :service AND u.year = :year")
    List<Object[]> findQuantityPerSurfaceYearFixed(String disinf, String service, String year);

    @Query("SELECT u.year, SUM(u.quantity) " +
            "FROM Utilization u " +
            "WHERE u.disinfectant = :disinf AND u.surface = :surface " +
            "GROUP BY u.year")
    List<Object[]> quantityYearDisinfectantSurface(String disinf, String surface);

    @Query("SELECT u.year, SUM(u.quantity) " +
            "FROM Utilization u " +
            "WHERE u.disinfectant = :disinf AND u.service = :service " +
            "GROUP BY u.year")
    List<Object[]> quantityYearDisinfectantService(String disinf, String service);

    @Query("SELECT u.year, SUM(u.quantity) " +
            "FROM Utilization u " +
            "WHERE u.disinfectant = :disinf AND u.service = :service AND u.surface = :surface " +
            "GROUP BY u.year")
    List<Object[]> quantityYearDisinfectantServiceSurface(String disinf, String service, String surface);


    @Query("SELECT u.year, SUM(u.quantity) FROM Utilization u WHERE u.disinfectant = :disinf GROUP BY u.year")
    List<Object[]> quantityUsedOfDisinfectant(String disinf);


    @Query("SELECT u.year, SUM(u.quantity) FROM Utilization u WHERE u.disinfectant = :disinf AND u.year = :year GROUP BY u.year")
    List<Object[]> quantityUsedOfDisinfectantThisYear(String disinf, String year);

    @Query("SELECT DISTINCT u.disinfectant, u.service, u.surface, u.year " +
            "FROM Utilization u " +
            "ORDER BY u.year DESC, u.disinfectant ASC, u.service ASC, u.surface ASC")
    List<Object[]> getInfos();

    @Query("SELECT DISTINCT u.disinfectant, SUM(u.quantity) FROM Utilization u WHERE u.year= :year GROUP BY u.disinfectant")
    List <Object[]> getYearStats(String year);

    @Query("SELECT DISTINCT u.disinfectant, SUM(u.quantity) FROM Utilization u WHERE u.year= :year AND u.service= :service GROUP BY u.disinfectant")
    List <Object[]> getYearStatsPerService(String year, String service);

    @Query("SELECT DISTINCT u.disinfectant, SUM(u.quantity) FROM Utilization u WHERE u.year= :year AND u.surface= :surface GROUP BY u.disinfectant")
    List <Object[]> getYearStatsPerSurface(String year, String surface);


}



