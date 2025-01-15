package com.openclassrooms.starterjwt;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.services.SessionService;

@SpringBootTest
@TestPropertySource("classpath:application-test.properties")
public class SessionServiceIntegrationTest {

  @Autowired
    private SessionService sessionService;

    @Autowired
    private SessionRepository sessionRepository;

  @Test
  void getById_ShouldReturnYogaSession(){
    Session yogaSession = sessionService.getById(1L);

    // Vérification que la session n'est pas null
    assertNotNull(yogaSession, "Session is null");

    // Vérification des propriétés de la session
    assertEquals("Yoga", yogaSession.getName(), "Incorrect session name");
    assertEquals("Yoga session", yogaSession.getDescription(), "Incorrect description");

    // Vérification du professeur
    assertEquals("Margot", yogaSession.getTeacher().getFirstName(), "Wrong teacher name");
    assertEquals("DELAHAYE", yogaSession.getTeacher().getLastName(), "Wrong teacher last name");
  }

  @Test
  void findAll_ShouldReturnAllSessions(){
    // Récupération de toutes les sessions
    Iterable<Session> sessions = sessionService.findAll();

    // Vérification du nombre de sessions
    assertEquals(2, ((java.util.Collection<?>) sessions).size(), "Incorrect number of sessions");

    // Vérification des propriétés de la première session
    Session firstSession = ((java.util.List<Session>) sessions).get(0);
    assertEquals("Yoga", firstSession.getName(), "Incorrect session name");
    assertEquals("Yoga session", firstSession.getDescription(), "Incorrect description");

    // Vérification du professeur de la première session
    assertEquals("Margot", firstSession.getTeacher().getFirstName(), "Wrong teacher name");
    assertEquals("DELAHAYE", firstSession.getTeacher().getLastName(), "Wrong teacher last name");

    // Vérification des propriétés de la deuxième session
    Session secondSession = ((java.util.List<Session>) sessions).get(1);
    assertEquals("Pilates", secondSession.getName(), "Incorrect session name");
    assertEquals("Pilates session", secondSession.getDescription(), "Incorrect description");

    // Vérification du professeur de la deuxième session
    assertEquals("Hélène", secondSession.getTeacher().getFirstName(), "Wrong teacher name");
    assertEquals("THIERCELIN", secondSession.getTeacher().getLastName(), "Wrong teacher last name");
  }

  @Test
  void delete_ShouldDeleteSession(){
    // Suppression de la session
    sessionService.delete(2L);

    // Vérification que la session n'existe plus
    assertEquals(1, ((java.util.Collection<?>) sessionRepository.findAll()).size(), "Incorrect number of sessions");
  }
}
