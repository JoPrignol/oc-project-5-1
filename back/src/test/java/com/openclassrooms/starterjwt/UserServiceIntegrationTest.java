package com.openclassrooms.starterjwt;

import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.UserService;

@SpringBootTest
@TestPropertySource("classpath:application-test.properties")
public class UserServiceIntegrationTest {

  @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

  @Test
  void deleteById_ShouldDeleteUserWhenCalled(){

    // Créer un utilisateur
    User user = User.builder()
    .email("Utilisateur@test.com")
    .lastName("Utilisateur")
    .firstName("Test")
    .password("motdepasse123")
    .admin(false)
    .build();

    // Enregistrer l'utilisateur dans la base de données
    userRepository.save(user);

    // Supprimer l'utilisateur
    userService.delete(3L);

    // Vérifier la suppression
    assertFalse(userRepository.findById(3L).isPresent());
  }
}
