package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.services.SessionService;
import com.openclassrooms.starterjwt.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Optional;

class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SessionService sessionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void update_ShouldUpdateSession() {

        Long sessionId = 1L;

        Session existingSession = new Session();
        existingSession.setId(sessionId);
        existingSession.setName("Old Session Name");

        Session updatedSession = new Session();
        updatedSession.setName("Updated Session Name");

        when(sessionRepository.save(any(Session.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Session result = sessionService.update(sessionId, updatedSession);

        assertEquals(sessionId, result.getId());
        assertEquals("Updated Session Name", result.getName());
        verify(sessionRepository, times(1)).save(updatedSession);
    }

    @Test
    void participate_ShouldThrowNotFoundException_WhenUserIsNull() {
        Long sessionId = 1L;
        Long userId = 1L;

        Session testSession = new Session();

        // Simuler une session existante dans le repository
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(testSession));

        // Simuler l'absence d'utilisateur dans le repository
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Vérification que l'exception NotFoundException est lancée lorsque l'utilisateur est nul
        assertThrows(NotFoundException.class, () -> sessionService.participate(sessionId, userId));

        // Vérifier que les méthodes findById ont été appelées une seule fois
        verify(sessionRepository, times(1)).findById(sessionId);
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void participate_ShouldThrowNotFoundException_WhenSessionIsNull() {
        Long sessionId = 1L;
        Long userId = 1L;

        User testUser = new User();

        // Simuler une session existante dans le repository
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.empty());

        // Simuler l'absence d'utilisateur dans le repository
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

        // Vérification que l'exception NotFoundException est lancée lorsque l'utilisateur est nul
        assertThrows(NotFoundException.class, () -> sessionService.participate(sessionId, userId));

        // Vérifier que les méthodes findById ont été appelées une seule fois
        verify(sessionRepository, times(1)).findById(sessionId);
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void participate_ShouldNotThrowNotFoundException_WhenSessionAndUserExists() {
        Long sessionId = 1L;
        Long userId = 1L;

        // Création de l'utilisateur et de la session
        User testUser = new User();
        Session testSession = new Session();

        // Initialiser la liste des utilisateurs de la session
        testSession.setUsers(new ArrayList<>());

        // Simuler la session existante dans le repository
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(testSession));

        // Simuler l'utilisateur existant dans le repository
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

        // Vérification qu'aucune exception n'est lancée
        assertDoesNotThrow(() -> sessionService.participate(sessionId, userId));

        // Vérification que l'utilisateur a bien été ajouté à la session
        assertTrue(testSession.getUsers().contains(testUser));

        // Vérification que la méthode save a bien été appelée
        verify(sessionRepository, times(1)).save(testSession);

        // Vérifier que les méthodes findById ont été appelées une seule fois
        verify(sessionRepository, times(1)).findById(sessionId);
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void participate_ShouldThrowBadRequestException_WhenUserAlreadyParticipates() {
        Long sessionId = 1L;
        Long userId = 1L;

        // Création de l'utilisateur et de la session
        User testUser = new User();
        testUser.setId(userId);

        Session testSession = new Session();
        testSession.setId(sessionId);

        // Initialiser la liste des utilisateurs de la session et y ajouter l'utilisateur
        testSession.setUsers(new ArrayList<>());
        // Ajouter l'utilisateur pour simuler qu'il participe déjà à la session
        testSession.getUsers().add(testUser);

        // Simuler la session existante dans le repository
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(testSession));

        // Simuler l'utilisateur existant dans le repository
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

        // Vérification que la BadRequestException est lancée
        assertThrows(BadRequestException.class, () -> sessionService.participate(sessionId, userId));

        // Vérification que la méthode save n'est pas appelée puisque l'utilisateur ne peut pas être ajouté
        verify(sessionRepository, times(0)).save(testSession);

        // Vérification que les méthodes findById ont été appelées une seule fois
        verify(sessionRepository, times(1)).findById(sessionId);
        verify(userRepository, times(1)).findById(userId);
    }


}
