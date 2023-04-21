/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/SQLTemplate.sql to edit this template
 */
/**
 * Author:  Leo Yuen
 * Created: 2023年4月5日
 */


-- User table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- TODOs table
CREATE TABLE TODOs (
    todoID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,
    task VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(id)
);