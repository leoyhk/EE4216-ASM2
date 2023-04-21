/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/SQLTemplate.sql to edit this template
 */
/**
 * Author:  Leo Yuen
 * Created: 2023年4月5日
 */


INSERT INTO users (username, password) VALUES ('demo', 'EE4216');
INSERT INTO users (username, password) VALUES ('user2', 'EE4216');

INSERT INTO todos (task, status, userID) VALUES ('Buy milk', false, 1);
INSERT INTO todos (task, status, userID) VALUES ('Take out trash', false, 1);
INSERT INTO todos (task, status, userID) VALUES ('Do laundry', true, 1);
INSERT INTO todos (task, status, userID) VALUES ('Call mom', false, 1);
INSERT INTO todos (task, status, userID) VALUES ('Finish project', true, 1);
INSERT INTO todos (task, status, userID) VALUES ('Go for a run', false, 1);
INSERT INTO todos (task, status, userID) VALUES ('Study for exam', false, 1);
INSERT INTO todos (task, status, userID) VALUES ('Clean bathroom', true, 1);
INSERT INTO todos (task, status, userID) VALUES ('Pay bills', false, 1);
INSERT INTO todos (task, status, userID) VALUES ('Buy groceries', true, 1);

INSERT INTO todos (task, status, userID) VALUES ('Clean bathroom', true, 2);
INSERT INTO todos (task, status, userID) VALUES ('Pay bills', false, 2);
INSERT INTO todos (task, status, userID) VALUES ('Buy groceries', true, 2);

