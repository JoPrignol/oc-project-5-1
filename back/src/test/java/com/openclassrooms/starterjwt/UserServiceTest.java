package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Test
    void findById_shouldReturnUser_whenUserExists() {

        // création d'un mock de UserRepository
        UserRepository userRepository = mock(UserRepository.class);

        // Injection du mock dans le service
        UserService userService = new UserService(userRepository);

        // Création et définition de l'utilisateur fictif
        User mockUser = User.builder()
          .id(1L)
          .email("test@user.com")
          .lastName("Test")
          .firstName("User")
          .password("test!1234")
          .admin(false)
          .build();

        // Si findById est appelé, alors le mock de user est appelé
        when(userRepository.findById(1L))
                .thenReturn(Optional.of(mockUser));

        // Exécution de la méthode findById
        User result = userService.findById(1L);

        // Vérification des resultats
        // L'utilisateur retourné par la méthode findById doit être le même que l'utilisateur fictif
        assertEquals(mockUser, result);
        // Vérification que la méthode findById a été appelée une fois
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void findById_shouldReturnNull_whenUserDoesNotExist() {

    // Création d'un mock de UserRepository
    UserRepository userRepository = mock(UserRepository.class);

    // Injection du mock dans le service
    UserService userService = new UserService(userRepository);

    // Si l'utilisateur n'est pas trouvé, on renvoie un objet vide
    when(userRepository.findById(1L)).thenReturn(Optional.empty());

    // Execution de la méthode findById
    User result = userService.findById(1L);

    // Vérification des resultats
    // L'utilisateur retourné par la méthode findById doit être null
    assertEquals(null, result);

    // Vérifie que findById a été appelé une fois
    verify(userRepository, times(1)).findById(1L);
}
}
