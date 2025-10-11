package com.pcd.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional <User> findByEmail(String email);
    Optional <User>findByResetToken(String token);

    // Custom query to find users by role name
    List<User> findByRole(UserRole role);


}
