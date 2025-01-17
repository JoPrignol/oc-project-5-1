package com.openclassrooms.starterjwt;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.mapper.SessionMapperImpl;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;

class SessionMapperTest {

  @Autowired
  SessionMapperImpl sessionMapperImpl;

  private final SessionMapper sessionMapper = new SessionMapperImpl();

  @Test
  void toEntity_shouldReturnNull_WhenDtoListIsNull() {

    List<SessionDto> dtoList = null;

    List<Session> entityList = sessionMapper.toEntity(dtoList);

    assertNull(entityList);
  }

  @Test
  void toDto_shouldReturnNull_WhenEntityListIsNull() {

    List<Session> entityList = null;

    List<SessionDto> dtoList = sessionMapper.toDto(entityList);

    assertNull(dtoList);
  }

  @Test
  void toEntity_shouldReturnNull_WhenDtoIsNull() {

    SessionDto dto = null;

    Session entity = sessionMapper.toEntity(dto);

    assertNull(entity);
  }

  @Test
  void toDto_shouldReturnNull_WhenEntityIsNull() {

    Session entity = null;

    SessionDto dto = sessionMapper.toDto(entity);

    assertNull(dto);
  }

  @Test
    void sessionTeacherId_ShouldReturnNull_WhenSessionIsNull() throws Exception {
      // Récupérer la classe et la méthode privée
      SessionMapperImpl sessionMapperImpl = new SessionMapperImpl();
      Method method = SessionMapperImpl.class.getDeclaredMethod("sessionTeacherId", Session.class);

      // Rendre la méthode accessible
      method.setAccessible(true);

      // Exécuter la méthode
      Long result = (Long) method.invoke(sessionMapperImpl, (Session) null);

      // Vérifier le résultat
      assertNull(result);
    }

    @Test
    void sessionTeacherId_ShouldReturnNull_WhenTeacherIsNull() throws Exception {

      SessionMapperImpl sessionMapperImpl;
      Method sessionTeacherIdMethod;
      sessionMapperImpl = new SessionMapperImpl();
      sessionTeacherIdMethod = SessionMapperImpl.class.getDeclaredMethod("sessionTeacherId", Session.class);
      sessionTeacherIdMethod.setAccessible(true);

      Session session = new Session();
      session.setTeacher(null);

      Long result = (Long) sessionTeacherIdMethod.invoke(sessionMapperImpl, session);
      assertNull(result);
    }

    @Test
    void sessionTeacherId_ShouldReturnNull_WhenTeacherIdIsNull() throws Exception {

      SessionMapperImpl sessionMapperImpl;
      Method sessionTeacherIdMethod;
      sessionMapperImpl = new SessionMapperImpl();
      sessionTeacherIdMethod = SessionMapperImpl.class.getDeclaredMethod("sessionTeacherId", Session.class);
      sessionTeacherIdMethod.setAccessible(true);

      Session session = new Session();
      Teacher teacher = new Teacher();
      teacher.setId(null);
      session.setTeacher(teacher);

      Long result = (Long) sessionTeacherIdMethod.invoke(sessionMapperImpl, session);
      assertNull(result);
    }

    @Test
    void toEntity_ShouldConvertDtoListToEntityList_WhenDtoListIsNotNull() {

        SessionDto dto1 = new SessionDto();
        dto1.setId(1L);
        dto1.setName("Session Test 1");

        SessionDto dto2 = new SessionDto();
        dto2.setId(2L);
        dto2.setName("Session Test 2");

        List<SessionDto> dtoList = Arrays.asList(dto1, dto2);

        List<Session> entityList = sessionMapper.toEntity(dtoList);

        assertNotNull(entityList);
        assertEquals(2, entityList.size());

        assertEquals(dto1.getId(), entityList.get(0).getId());
        assertEquals(dto1.getName(), entityList.get(0).getName());

        assertEquals(dto2.getId(), entityList.get(1).getId());
        assertEquals(dto2.getName(), entityList.get(1).getName());
    }

}
