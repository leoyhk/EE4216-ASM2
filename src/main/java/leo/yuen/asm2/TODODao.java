/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package leo.yuen.asm2;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author konoleoda
 */
public class TODODao {

    private JdbcTemplate jdbcTemplate;

    public TODODao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<TODO> getTODO(int UID) {
        String sql = "SELECT * FROM TODOs where userID = ?";
        List<TODO> TODOs = jdbcTemplate.query(sql, (rs, rowNum)
                -> new TODO(
                        rs.getInt("todoID"),
                        rs.getString("TASK"),
                        rs.getBoolean("Status")
                ), UID
        );
        return TODOs;
    }

    public void updateTODO(TODO TODO, int UID) {
        String sql = "UPDATE TODOs SET task = ?, status = ? WHERE todoID = ? AND userID = ?";
        jdbcTemplate.update(sql, TODO.getTask(), TODO.getIsCompleted(), TODO.getId(), UID);
    }

    public void deleteTODO(int TODOId, int UID) {
        String sql = "DELETE FROM TODOs WHERE todoID = ? AND userID = ?";
        jdbcTemplate.update(sql, TODOId, UID);
    }

    public void addTODO(TODO TODO, int UID) {
        String sql = "INSERT INTO TODOs (userID, task, status) VALUES (?,?, ?)";
        jdbcTemplate.update(sql, UID, TODO.getTask(), TODO.getIsCompleted());
    }
}
