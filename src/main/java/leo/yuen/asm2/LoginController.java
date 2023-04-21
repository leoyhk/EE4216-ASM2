/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package leo.yuen.asm2;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.view.RedirectView;

/**
 *
 * @author Leo Yuen
 */
@Controller
public class LoginController {

    UserDao userDao;

    public LoginController(UserDao userDao) {
        this.userDao = userDao;
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // Thymeleaf template name for login page
    }

    @PostMapping("/api/login")
    public ResponseEntity<String>
            login(@RequestBody User receivedUser,
                    HttpSession session
            ) {
        User user = userDao.getUserByUsername(receivedUser.getUsername());
        if (user != null && user.getPassword().equals(receivedUser.getPassword())) {
            session.setAttribute("userID", user.getId());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }
}
