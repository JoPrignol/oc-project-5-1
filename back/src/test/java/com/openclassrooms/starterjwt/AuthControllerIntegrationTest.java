package com.openclassrooms.starterjwt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.request.SignupRequest;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("classpath:application-test.properties")
public class AuthControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  public static String asJsonString(Object obj) throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    return objectMapper.writeValueAsString(obj);
  }

  @Test
  void authenticateUser_ShouldReturnOk_WhenCredentialsAreValid() throws Exception {
      // Création d'une requête de connexion avec des informations valides
      LoginRequest loginRequest = new LoginRequest();
      loginRequest.setEmail("yoga@studio.com");
      loginRequest.setPassword("test!1234");

      // Simulation du comportement de l'authentification et de la génération du JWT
      mockMvc.perform(post("/api/auth/login")
              .contentType(MediaType.APPLICATION_JSON)
              .content(asJsonString(loginRequest)))
              .andExpect(status().isOk())
              .andExpect(jsonPath("$.token").isNotEmpty())
              .andExpect(jsonPath("$.id").isNotEmpty())
              .andExpect(jsonPath("$.username").value("yoga@studio.com"))
              .andExpect(jsonPath("$.firstName").value("Admin"))
              .andExpect(jsonPath("$.lastName").value("Admin"));
  }

  @Test
  void registerUser_ShouldReturnOk_WhenSignupIsSuccessful() throws Exception {
      // Création de la requête d'inscription avec des informations valides
      SignupRequest signUpRequest = new SignupRequest();
      signUpRequest.setEmail("newuser@studio.com");
      signUpRequest.setPassword("newpassword123");
      signUpRequest.setFirstName("New");
      signUpRequest.setLastName("User");

      // Simulation de l'enregistrement de l'utilisateur
      mockMvc.perform(post("/api/auth/register")
              .contentType(MediaType.APPLICATION_JSON)
              .content(asJsonString(signUpRequest)))
              .andExpect(status().isOk())
              .andExpect(jsonPath("$.message").value("User registered successfully!")); // Vérifie que le message de succès est correct
  }

  @Test
  void registerUser_ShouldReturnError_WhenSignupIsDoneWithExistingCredentials() throws Exception {
      // Création de la requête d'inscription avec des informations valides (email déjà existant)
      SignupRequest signUpRequest = new SignupRequest();
      signUpRequest.setEmail("yoga@studio.com");
      signUpRequest.setPassword("test!1234");
      signUpRequest.setFirstName("Admin");
      signUpRequest.setLastName("Admin");

      // Enregistrement de l'utilisateur dans la base de données
      mockMvc.perform(post("/api/auth/register")
              .contentType(MediaType.APPLICATION_JSON)
              .content(asJsonString(signUpRequest)))
              .andExpect(status().isBadRequest())
              .andExpect(jsonPath("$.message").value("Error: Email is already taken!"));
  }

  @Test
  void authenticateUser_ShouldReturnUnauthorized_WhenUserNotFound() throws Exception {
      // Création de la requête de connexion avec un email qui n'existe pas dans la base de données
      LoginRequest loginRequest = new LoginRequest();
      loginRequest.setEmail("nonexistent@user.com");
      loginRequest.setPassword("password123");

      // Simulation de la connexion de l'utilisateur
      mockMvc.perform(post("/api/auth/login")
              .contentType(MediaType.APPLICATION_JSON)
              .content(asJsonString(loginRequest)))
              .andExpect(status().isUnauthorized())
              .andExpect(jsonPath("$.message").value("Bad credentials"));
  }

}
