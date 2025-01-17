package com.openclassrooms.starterjwt;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.mapper.TeacherMapperImpl;
import com.openclassrooms.starterjwt.models.Teacher;

public class TeacherMapperTest {

  private TeacherMapperImpl teacherMapper;

  @BeforeEach
  void setup(){
    teacherMapper = new TeacherMapperImpl();
  }

  @Test
  void toEntity_ShouldConvertDtoToEntity() {
      // Création d'un utilisateur fictif
      TeacherDto dto = new TeacherDto();
      dto.setId(1L);
      dto.setFirstName("Test");
      dto.setLastName("Teacher");
      dto.setCreatedAt(LocalDateTime.of(2024, 1, 1, 12, 0));
      dto.setUpdatedAt(LocalDateTime.of(2024, 1, 2, 12, 0));

      // Passage du DTO en entité
      Teacher entity = teacherMapper.toEntity(dto);

      // Vérification des données
      assertNotNull(entity);
      assertEquals(dto.getId(), entity.getId());
      assertEquals(dto.getFirstName(), entity.getFirstName());
      assertEquals(dto.getLastName(), entity.getLastName());
      assertEquals(dto.getCreatedAt(), entity.getCreatedAt());
      assertEquals(dto.getUpdatedAt(), entity.getUpdatedAt());
  }

  @Test
  void toEntity_ShouldReturnNull_IfDTOIsNull() {
      // Création d'un utilisateur fictif
      TeacherDto dto = null;

      // Passage du DTO en entité
      Teacher entity = teacherMapper.toEntity(dto);

      // Vérification des données
      assertNull(entity);
  }

  @Test
  void toDto_ShouldConvertEntityToDto() {
      // Création d'un utilisateur fictif
      Teacher entity = Teacher.builder()
              .id(1L)
              .firstName("Teacher")
              .lastName("Test")
              .createdAt(LocalDateTime.of(2024, 1, 3, 10, 30))
              .updatedAt(LocalDateTime.of(2024, 1, 4, 14, 0))
              .build();

      // Passage d'entité à DTO
      TeacherDto dto = teacherMapper.toDto(entity);

      // Vérification des données
      assertNotNull(dto);
      assertEquals(entity.getId(), dto.getId());
      assertEquals(entity.getFirstName(), dto.getFirstName());
      assertEquals(entity.getLastName(), dto.getLastName());
      assertEquals(entity.getCreatedAt(), dto.getCreatedAt());
      assertEquals(entity.getUpdatedAt(), dto.getUpdatedAt());
  }

  @Test
  void toDto_ShouldReturnNull_IfEntityIsNull() {
      // Création d'un utilisateur fictif
      Teacher entity = null;

      // Passage du DTO en entité
      TeacherDto dto = teacherMapper.toDto(entity);

      // Vérification des données
      assertNull(dto);
  }

  @Test
  void toEntity_ShouldConvertDtoListToEntityList() {

      // Création de deux DTO
      TeacherDto dto1 = new TeacherDto();
      dto1.setId(1L);
      dto1.setFirstName("Test");
      dto1.setLastName("Teacher");
      dto1.setCreatedAt(LocalDateTime.now());
      dto1.setUpdatedAt(LocalDateTime.now());

      TeacherDto dto2 = new TeacherDto();
      dto2.setId(2L);
      dto2.setFirstName("Teacher");
      dto2.setLastName("Test");
      dto2.setCreatedAt(LocalDateTime.now());
      dto2.setUpdatedAt(LocalDateTime.now());

      List<TeacherDto> dtoList = Arrays.asList(dto1, dto2);

      // Passage de la liste de DTO en liste d'entités
      List<Teacher> entityList = teacherMapper.toEntity(dtoList);

      // Vériication des données
      assertNotNull(entityList);
      assertEquals(2, entityList.size());
      assertEquals(dto1.getFirstName(), entityList.get(0).getFirstName());
      assertEquals(dto2.getLastName(), entityList.get(1).getLastName());
  }

  @Test
  void toEntity_ShouldReturnNull_IfDtoListIsNull() {
      // Création d'un utilisateur fictif
      List<TeacherDto> dtoList = null;

      // Passage du DTO en entité
      List<Teacher> entityList = teacherMapper.toEntity(dtoList);

      // Vérification des données
      assertNull(entityList);
  }

  @Test
  void toDto_ShouldReturnNull_IfEntityListIsNull() {
      // Création d'un utilisateur fictif
      List<Teacher> entityList = null;

      // Passage du DTO en entité
      List<TeacherDto> dtoList = teacherMapper.toDto(entityList);

      // Vérification des données
      assertNull(dtoList);
  }

}
