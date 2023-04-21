package leo.yuen.asm2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class Asm2Application {

    public static void main(String[] args) {
        SpringApplication.run(Asm2Application.class, args);
    }

    @Bean
    public TODODao todoDao(JdbcTemplate jdbcTemplate) {
        return new TODODao(jdbcTemplate);
    }

    @Bean
    public UserDao userDao(JdbcTemplate jdbcTemplate) {
        return new UserDao(jdbcTemplate);
    }
    
    
}
