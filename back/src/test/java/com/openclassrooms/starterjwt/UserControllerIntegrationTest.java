package com.openclassrooms.starterjwt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("classpath:application-test.properties")
public class UserControllerIntegrationTest {


  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private UserRepository userRepository;

  @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void findById_ShouldReturnUser_WhenUserExists() throws Exception {

      // Mock d'une requête GET sur l'URL /api/user/1
      mockMvc.perform(get("/api/user/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.firstName").value("Admin"))
            .andExpect(jsonPath("$.lastName").value("Admin"))
            .andExpect(jsonPath("$.admin").value("true"));
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void findById_ShouldReturnNotFound_WhenUserDoesNotExists() throws Exception {

      // Mock d'une requête GET sur l'URL /api/user/999
      mockMvc.perform(get("/api/user/999"))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void deleteUser_ShouldReturnNotFound_WhenUserDoesNotExist() throws Exception {

      mockMvc.perform(delete("/api/user/999"))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void deleteUser_ShouldReturnUnauthorized_WhenUserIsNotThisUser() throws Exception {

      mockMvc.perform(delete("/api/user/1"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "test@user.com", roles = "USER")
    void deleteUser_ShouldDeleteUser_WhenUserIsThisUser() throws Exception {
        // Ajouter un utilisateur dans la base
        User user = new User();
        user.setId(3L);
        user.setEmail("test@user.com");
        user.setFirstName("Test");
        user.setLastName("User");
        userRepository.saveAndFlush(user); // Force un flush pour assurer la persistance

        // Effectuer la requête DELETE
        mockMvc.perform(delete("/api/user/3"))
              .andExpect(status().isOk());

        // Vérifier que l'utilisateur est supprimé
        assertFalse(userRepository.findById(3L).isPresent());
    }

}
