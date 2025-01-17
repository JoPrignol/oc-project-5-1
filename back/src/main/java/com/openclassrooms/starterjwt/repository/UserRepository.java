package com.openclassrooms.starterjwt.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.starterjwt.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
  // {
  //   // TODO Auto-generated method stub
  //   throw new UnsupportedOperationException("Unimplemented method 'findByEmail'");
  // }

  Boolean existsByEmail(String email);
}
