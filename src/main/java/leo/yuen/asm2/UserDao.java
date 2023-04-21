/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package leo.yuen.asm2;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 *
 * @author Leo Yuen
 */
public class UserDao {

    private JdbcTemplate jdbcTemplate;

    public UserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public User getUserByUsername(String username) {
        String sql = "SELECT * FROM USERS where username = ?";

        List<User> retrivedUser = jdbcTemplate.query(sql, (rs, rowNum)
                -> new User(
                        rs.getInt("ID"),
                        rs.getString("username"),
                        rs.getString("password")
                ), username
        );
        if (!retrivedUser.isEmpty()) {
            return retrivedUser.get(0);
        } else {
            return null;
        }

    }
}
