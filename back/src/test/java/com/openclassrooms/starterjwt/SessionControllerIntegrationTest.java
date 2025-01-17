package com.openclassrooms.starterjwt;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("classpath:application-test.properties")
public class SessionControllerIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
    private ObjectMapper objectMapper;

  @Autowired
    private UserRepository userRepository;

  @Autowired
    private SessionRepository sessionRepository;

  @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void findById_ShouldReturnSession_WhenSessionExists() throws Exception {

      // Mock d'une requête GET sur l'URL /api/session/1
      mockMvc.perform(get("/api/session/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Yoga"))
            .andExpect(jsonPath("$.description").value("Yoga session"));
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void findAll_ShouldReturnAllSessions_WhenSessionsExists() throws Exception {

      // Mock d'une requête GET sur l'URL
      mockMvc.perform(get("/api/session"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].name").value("Yoga"))
            .andExpect(jsonPath("$[1].name").value("Pilates"));
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void findById_ShouldReturnNotFound_WhenSessionDoesNotExists() throws Exception {

      // Mock d'une requête GET sur l'URL /api/session/999
      mockMvc.perform(get("/api/session/999"))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void create_ShouldReturnCreatedSession_WhenValidRequest() throws Exception {
        // Création d'un objet SessionDto simulé
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("Meditation");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("Meditation session");

        // Conversion en JSON
        String sessionJson = objectMapper.writeValueAsString(sessionDto);

        // Envoi de la requête POST
        mockMvc.perform(post("/api/session")
                .contentType(MediaType.APPLICATION_JSON)
                .content(sessionJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Meditation"))
                .andExpect(jsonPath("$.description").value("Meditation session"));
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void create_ShouldModifySession_WhenPutRequestIsPerformed() throws Exception {
        // Création d'un objet SessionDto simulé
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("Ashtanga Yoga");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("Ashtanga Yoga session");

        // Conversion en JSON
        String sessionJson = objectMapper.writeValueAsString(sessionDto);

        // Envoi de la requête PUT
        mockMvc.perform(put("/api/session/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(sessionJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Ashtanga Yoga"))
                .andExpect(jsonPath("$.description").value("Ashtanga Yoga session"));
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void delete_ShouldDeleteSession_WhenSessionExists() throws Exception {

      // Mock d'une requête DELETE sur l'URL /api/session/1
      mockMvc.perform(delete("/api/session/1"))
            .andExpect(status().isOk());

      // Vérification que la session a bien été supprimée
      mockMvc.perform(get("/api/session/1"))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void delete_ShouldReturnNotFound_WhenSessionDoesNotExists() throws Exception {

      // Mock d'une requête GET sur l'URL /api/session/999
      mockMvc.perform(delete("/api/session/999"))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "test@user.com", roles = "USER")
    void participate_ShouldAddUserToSession_WhenValidRequest() throws Exception {

        Long sessionId = 2L;
        Long userId = 2L;

        // Vérifier que l'utilisateur ne participe pas encore
        Session sessionBefore = sessionRepository.findById(sessionId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        assertFalse(sessionBefore.getUsers().contains(user));

        // Envoi de la requête
        mockMvc.perform(post("/api/session/" + sessionId + "/participate/" + userId))
              .andExpect(status().isOk());

        // Vérifier que l'utilisateur a bien été ajouté à la session
        Session sessionAfter = sessionRepository.findById(sessionId).orElseThrow();
        assertTrue(sessionAfter.getUsers().contains(user));
    }

    @Test
    @WithMockUser(username = "test@user.com", roles = "USER")
    void noLongerParticipate_ShouldRemoveUserFromSession_WhenValidRequest() throws Exception {

        Long sessionId = 2L;
        Long userId = 2L;

        //Vérifier que l'utilisateur est dans la session avant d'envoyer la requête de participation
        Session sessionBefore = sessionRepository.findById(sessionId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        // Si l'utilisateur n'est pas encore dans la session, l'ajouter
        if (!sessionBefore.getUsers().contains(user)) {
            mockMvc.perform(post("/api/session/" + sessionId + "/participate/" + userId))
                    .andExpect(status().isOk());
        }

        // Vérifie que l'utilisateur est bien ajouté à la session avant de tester la suppression
        sessionRepository.flush();
        sessionBefore = sessionRepository.findById(sessionId).orElseThrow();
        assertTrue(sessionBefore.getUsers().contains(user));

        // Requête de suppression de l'utilisateur
        mockMvc.perform(delete("/api/session/" + sessionId + "/participate/" + userId))
                .andExpect(status().isOk());

        // Forcer l'enregistrement en BDD
        sessionRepository.flush();

        // Vérifier que l'utilisateur a bien été retiré de la session
        Session sessionAfter = sessionRepository.findById(sessionId).orElseThrow();
        assertFalse(sessionAfter.getUsers().contains(user));
    }

    @Test
    @WithMockUser(username = "test@user.com", roles = "USER")
    void findById_ShouldThrowBadRequest_WhenIdIsNotValid() throws Exception {
        // Envoi de la requête GET
        mockMvc.perform(get("/api/session/invalid"))
              .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "test@user.com", roles = "USER")
    void update_ShouldThrowBadRequest_WhenIdIsNotValid() throws Exception {
        // Envoi de la requête PUT avec un ID invalide et un corps JSON pour SessionDto
        mockMvc.perform(put("/api/session/invalid")
                .contentType("application/json")
                .content("{ \"name\": \"Session 1\", \"description\": \"Description 1\" }"))
              .andExpect(status().isBadRequest());
    }


    @Test
    @WithMockUser(username = "test@user.com", roles = "USER")
    void save_ShouldThrowBadRequest_WhenIdIsNotValid() throws Exception {
        // Envoi de la requête DELETE avec un ID invalide
        mockMvc.perform(delete("/api/session/invalid"))
              .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "test@user.com", roles = "USER")
    void participate_ShouldThrowBadRequest_WhenIdsAreNotValid() throws Exception {
        // Envoi de la requête POST avec des ID invalides
        mockMvc.perform(post("/api/session/invalid/participate/invalidUserId"))
              .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "test@user.com", roles = "USER")
    void noLongerParticipate_ShouldThrowBadRequest_WhenIdsAreNotValid() throws Exception {
        // Envoi de la requête DELETE avec des ID invalides
        mockMvc.perform(delete("/api/session/invalid/participate/invalidUserId"))
              .andExpect(status().isBadRequest());
    }


}
