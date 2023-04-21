/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package leo.yuen.asm2;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author konoleoda
 */
@RestController
@RequestMapping(value = "/api/todo")
public class TODOController {

    private TODODao todoDao;

    public TODOController(TODODao todoDao) {
        this.todoDao = todoDao;
    }

    @GetMapping(value = "/check-status", produces = "application/json")
    public ResponseEntity<String> checkStatus() {
        String status = "{ \"message\": \"Connection is Valid\" }";
        return ResponseEntity.ok().body(status);
    }

    @GetMapping(value = "", produces = "application/json")
    public List<TODO> getTODO(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        int userID = (int) session.getAttribute("userID");
        return todoDao.getTODO(userID);
    }

    @PutMapping(value = "/{id}")
    public void updateTODO(@PathVariable int id, @RequestBody TODO todo, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        int userID = (int) session.getAttribute("userID");
        todo.setId(id);
        todoDao.updateTODO(todo, userID);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteTODO(@PathVariable int id, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        int userID = (int) session.getAttribute("userID");
        todoDao.deleteTODO(id, userID);
    }

    @PostMapping("")
    public void addTODO(@RequestBody TODO todo, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        int userID = (int) session.getAttribute("userID");
        todoDao.addTODO(todo, userID);
    }

}
