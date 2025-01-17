package com.openclassrooms.starterjwt;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapperImpl;
import com.openclassrooms.starterjwt.models.User;

public class UserMapperTest {

  private UserMapperImpl userMapper;

  @BeforeEach
  void setup(){
    userMapper = new UserMapperImpl();
  }

  @Test
  void toEntity_ShouldConvertDtoToEntity() {
      // Création d'un utilisateur fictif
      UserDto dto = new UserDto();
      dto.setId(1L);
      dto.setFirstName("Test");
      dto.setLastName("User");
      dto.setEmail("test@user.com");
      dto.setPassword("password");
      dto.setAdmin(false);
      dto.setCreatedAt(LocalDateTime.of(2024, 1, 1, 12, 0));
      dto.setUpdatedAt(LocalDateTime.of(2024, 1, 2, 12, 0));

      // Passage du DTO en entité
      User entity = userMapper.toEntity(dto);

      // Vérification des données
      assertNotNull(entity);
      assertEquals(dto.getId(), entity.getId());
      assertEquals(dto.getFirstName(), entity.getFirstName());
      assertEquals(dto.getLastName(), entity.getLastName());
      assertEquals(dto.getEmail(), entity.getEmail());
      assertEquals(dto.getPassword(), entity.getPassword());
      assertEquals(dto.isAdmin(), entity.isAdmin());
      assertEquals(dto.getCreatedAt(), entity.getCreatedAt());
      assertEquals(dto.getUpdatedAt(), entity.getUpdatedAt());
  }

  @Test
  void toEntity_ShouldReturnNull_IfDTOIsNull() {
      // Création d'un utilisateur fictif
      UserDto dto = null;

      // Passage du DTO en entité
      User entity = userMapper.toEntity(dto);

      // Vérification des données
      assertNull(entity);
  }

  @Test
  void toDto_ShouldConvertEntityToDto() {
      // Création d'un utilisateur fictif
      User entity = User.builder()
              .id(1L)
              .firstName("User")
              .lastName("Test")
              .email("test@user.com")
              .password("password")
              .admin(false)
              .createdAt(LocalDateTime.of(2024, 1, 3, 10, 30))
              .updatedAt(LocalDateTime.of(2024, 1, 4, 14, 0))
              .build();

      // Passage d'entité à DTO
      UserDto dto = userMapper.toDto(entity);

      // Vérification des données
      assertNotNull(dto);
      assertEquals(entity.getId(), dto.getId());
      assertEquals(entity.getFirstName(), dto.getFirstName());
      assertEquals(entity.getLastName(), dto.getLastName());
      assertEquals(entity.getEmail(), dto.getEmail());
      assertEquals(entity.getPassword(), dto.getPassword());
      assertEquals(entity.isAdmin(), dto.isAdmin());
      assertEquals(entity.getCreatedAt(), dto.getCreatedAt());
      assertEquals(entity.getUpdatedAt(), dto.getUpdatedAt());
  }

  @Test
  void toDto_ShouldReturnNull_IfEntityIsNull() {
      // Création d'un utilisateur fictif
      User entity = null;

      // Passage du DTO en entité
      UserDto dto = userMapper.toDto(entity);

      // Vérification des données
      assertNull(dto);
  }

  @Test
  void toEntity_ShouldConvertDtoListToEntityList() {

      // Création de deux DTO
      UserDto dto1 = new UserDto();
      dto1.setId(1L);
      dto1.setFirstName("Test");
      dto1.setLastName("User");
      dto1.setEmail("test@user.com");
      dto1.setPassword("password");
      dto1.setAdmin(false);
      dto1.setCreatedAt(LocalDateTime.now());
      dto1.setUpdatedAt(LocalDateTime.now());

      UserDto dto2 = new UserDto();
      dto2.setId(2L);
      dto2.setFirstName("User");
      dto2.setLastName("Test");
      dto2.setEmail("user@test.com");
      dto2.setPassword("password");
      dto2.setAdmin(true);
      dto2.setCreatedAt(LocalDateTime.now());
      dto2.setUpdatedAt(LocalDateTime.now());

      List<UserDto> dtoList = Arrays.asList(dto1, dto2);

      // Passage de la liste de DTO en liste d'entités
      List<User> entityList = userMapper.toEntity(dtoList);

      // Vériication des données
      assertNotNull(entityList);
      assertEquals(2, entityList.size());
      assertEquals(dto1.getFirstName(), entityList.get(0).getFirstName());
      assertEquals(dto2.getLastName(), entityList.get(1).getLastName());
  }

  @Test
  void toEntity_ShouldReturnNull_IfDtoListIsNull() {
      // Création d'un utilisateur fictif
      List<UserDto> dtoList = null;

      // Passage du DTO en entité
      List<User> entityList = userMapper.toEntity(dtoList);

      // Vérification des données
      assertNull(entityList);
  }

  @Test
  void toDto_ShouldConvertEntityListToDtoList_WhenEntityListIsNotNull() {
      User user1 = new User();
      user1.setId(1L);
      user1.setFirstName("Test");
      user1.setLastName("User");
      user1.setEmail("test@user.com");
      user1.setPassword("password");
      user1.setAdmin(false);
      user1.setCreatedAt(LocalDateTime.now());
      user1.setUpdatedAt(LocalDateTime.now());

      User user2 = new User();
      user2.setId(2L);
      user2.setFirstName("User");
      user2.setLastName("Test");
      user2.setEmail("user@test.com");
      user2.setPassword("password");
      user2.setAdmin(true);
      user2.setCreatedAt(LocalDateTime.now());
      user2.setUpdatedAt(LocalDateTime.now());

      List<User> entityList = Arrays.asList(user1, user2);

      List<UserDto> dtoList = userMapper.toDto(entityList);

      assertNotNull(dtoList);
      assertEquals(2, dtoList.size());

      assertEquals(user1.getFirstName(), dtoList.get(0).getFirstName());
      assertEquals(user1.getEmail(), dtoList.get(0).getEmail());
      assertEquals(user1.getLastName(), dtoList.get(0).getLastName());
      assertEquals(user1.isAdmin(), dtoList.get(0).isAdmin());
      assertEquals(user1.getCreatedAt(), dtoList.get(0).getCreatedAt());
      assertEquals(user1.getUpdatedAt(), dtoList.get(0).getUpdatedAt());

      assertEquals(user2.getFirstName(), dtoList.get(1).getFirstName());
      assertEquals(user2.getEmail(), dtoList.get(1).getEmail());
      assertEquals(user2.getLastName(), dtoList.get(1).getLastName());
      assertEquals(user2.isAdmin(), dtoList.get(1).isAdmin());
      assertEquals(user2.getCreatedAt(), dtoList.get(1).getCreatedAt());
      assertEquals(user2.getUpdatedAt(), dtoList.get(1).getUpdatedAt());
  }


    @Test
    void toDto_ShouldReturnNull_IfEntityListIsNull() {
        // Création d'un utilisateur fictif
        List<User> entityList = null;

        // Passage du DTO en entité
        List<UserDto> dtoList = userMapper.toDto(entityList);

        // Vérification des données
        assertNull(dtoList);
    }

}
