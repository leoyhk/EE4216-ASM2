/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package leo.yuen.asm2;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Leo Yuen
 */
@RestController
public class SessionController {

    @GetMapping("/api/checkSession")
    public ResponseEntity<String> checkSession(HttpServletRequest request) {
        // Check if "user" session attribute is present and not null
        if (request.getSession().getAttribute("userID") == null) {
            // Session is not valid, send response indicating that
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Session expired");
        } else {
            // Session is valid, send response indicating that
            return ResponseEntity.ok("Session valid");
        }
    }

}
