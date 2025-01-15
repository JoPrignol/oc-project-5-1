package com.openclassrooms.starterjwt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("classpath:application-test.properties")
public class TeacherControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    // @Autowired
    // private ObjectMapper objectMapper;

    // @Autowired
    // private JwtUtils jwtUtils;

    // String token;

    // @BeforeEach
    // void setUp() {
    //     // Créer un objet UserDetailsImpl avec les arguments requis par le constructeur
    //     UserDetailsImpl userDetails = new UserDetailsImpl(
    //             3L,
    //             "testuser@test.com",
    //             "Test",
    //             "User",
    //             true,
    //             "password!1234"
    //     );

    //     // Créer un objet Authentication
    //     Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    //     // Générer un token pour l'utilisateur fictif
    //     token = jwtUtils.generateJwtToken(authentication);
    // }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void findById_ShouldReturnTeacher_WhenTeacherExists() throws Exception {

      // Mock d'une requête GET sur l'URL /api/teacher/1
      mockMvc.perform(get("/api/teacher/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.firstName").value("Margot"))
            .andExpect(jsonPath("$.lastName").value("DELAHAYE"));
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void findById_ShouldReturnNotFound_WhenTeacherDoesNotExist() throws Exception {
        mockMvc.perform(get("/api/teacher/999"))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(username = "testuser@test.com", roles = "USER")
    void findAll_ShouldReturnListOfTeachers() throws Exception {
        mockMvc.perform(get("/api/teacher"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].firstName").value("Margot"))
            .andExpect(jsonPath("$[1].firstName").value("Hélène"));
    }
}
