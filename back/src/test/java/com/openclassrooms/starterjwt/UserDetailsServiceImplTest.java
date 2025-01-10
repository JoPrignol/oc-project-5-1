// import org.junit.jupiter.api.Test;
// import org.mockito.Mockito;
// import static org.mockito.Mockito.*;
// import static org.junit.jupiter.api.Assertions.*;

// import com.openclassrooms.starterjwt.models.User;
// import com.openclassrooms.starterjwt.repository.UserRepository;
// import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
// import com.openclassrooms.starterjwt.security.services.UserDetailsServiceImpl;
// import org.springframework.security.core.userdetails.UserDetails;

// import java.util.Optional;

// class UserDetailsServiceImplTest {

//     @Test
//     void testLoadUserByUsername_ReturnsUserDetails() {
//             // Création d'un mock de UserRepository
//     UserRepository userRepository = mock(UserRepository.class);

//     // Création d'un utilisateur fictif
//     User mockUser = User.builder()
//                         .id(1L)
//                         .email("test@example.com")
//                         .lastName("Doe")
//                         .firstName("John")
//                         .password("password123")
//                         .build();

//     // Définition du comportement de findByEmail sur le mock
//     when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockUser));

//     // Création de l'instance UserDetailsServiceImpl avec le mock
//     UserDetailsServiceImpl userDetailsService = new UserDetailsServiceImpl(userRepository);

//     // Exécution de loadUserByUsername
//     UserDetails userDetails = userDetailsService.loadUserByUsername("test@example.com");

//     // Assertions
//     assertNotNull(userDetails);
//     assertEquals("test@example.com", userDetails.getUsername());
//     assertEquals("password123", userDetails.getPassword());

//     // Vérification que la méthode findByEmail a été appelée une fois
//     verify(userRepository, times(1)).findByEmail("test@example.com");
//     }
// }
