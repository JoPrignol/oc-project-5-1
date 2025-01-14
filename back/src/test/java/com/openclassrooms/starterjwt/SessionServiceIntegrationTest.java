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
}
