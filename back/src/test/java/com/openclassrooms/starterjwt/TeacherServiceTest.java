package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import com.openclassrooms.starterjwt.services.TeacherService;

import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class TeacherServiceTest {

  @Test
  void testFindById_ReturnsTeacher_WhenTeacherExists() {
      // Création d'un mock de TeacherRepository
      TeacherRepository teacherRepository = mock(TeacherRepository.class);

      // Injection du mock dans le service
      TeacherService teacherService = new TeacherService(teacherRepository);

      // Création et définition d'un Teacher fictif
      Teacher mockTeacher = Teacher.builder()
        .id(1L)
        .lastName("Test")
        .firstName("Teacher")
        .build();

      // Définition du comportement du mock
      when(teacherRepository.findById(1L)).thenReturn(Optional.of(mockTeacher));

      // Exécution de la méthode findById
      Teacher result = teacherService.findById(1L);

      // Vérifier que l'objet retourné est correct
      assertEquals(mockTeacher, result);
      // Vérifier que la méthode findById a été appelée une fois
      verify(teacherRepository, times(1)).findById(1L);
  }

  @Test
  void testFindById_ReturnsNull_WhenTeacherDoesNotExist() {
      TeacherRepository teacherRepository = mock(TeacherRepository.class);
      TeacherService teacherService = new TeacherService(teacherRepository);

      when(teacherRepository.findById(1L)).thenReturn(Optional.empty());

      Teacher result = teacherService.findById(1L);

      assertEquals(null, result);
      verify(teacherRepository, times(1)).findById(1L);
  }

  @Test
  void testFindAll_ReturnsListOfTeachers() {
      // Mock du repository
      TeacherRepository teacherRepository = mock(TeacherRepository.class);
      TeacherService teacherService = new TeacherService(teacherRepository);

      // Création d'une liste de Teachers
      List<Teacher> mockTeachers = Arrays.asList(
          Teacher.builder().id(1L).lastName("Doe").firstName("John").build(),
          Teacher.builder().id(2L).lastName("Smith").firstName("Jane").build()
      );

      // Définir le comportement du mock
      when(teacherRepository.findAll()).thenReturn(mockTeachers);

      // Appeler la méthode findAll
      List<Teacher> result = teacherService.findAll();

      // Vérifier que la liste n'est pas nulle
      assertNotNull(result);
      // Vérifier que la taille de la liste est identique au mock
      assertEquals(2, result.size());
      // Vérifier que le contenu est identique au mock
      assertEquals(mockTeachers, result);

      // Vérifier que la méthode findAll a été appelée
      verify(teacherRepository, times(1)).findAll();
  }

}
