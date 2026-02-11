-- Create database and set context
CREATE DATABASE IF NOT EXISTS blog;
USE blog;

-- Create user table
CREATE TABLE IF NOT EXISTS user 
(
    uid INT PRIMARY KEY,
    uname VARCHAR(20),
    email VARCHAR(20)
);

-- Create post table
CREATE TABLE IF NOT EXISTS post
(
    pid INT PRIMARY KEY,
    pname VARCHAR(20),
    uid INT,
    cat DATE,
    FOREIGN KEY (uid) REFERENCES user(uid)
);

-- Create comment table
CREATE TABLE IF NOT EXISTS comment 
( 
    c_id INT PRIMARY KEY, 
    c_text VARCHAR(20), 
    p_id INT, 
    u_id INT, 
    FOREIGN KEY (p_id) REFERENCES post(pid), 
    FOREIGN KEY (u_id) REFERENCES user(uid) 
);

-- Insert initial data into user
INSERT INTO user (uid, uname, email) VALUES 
(1,'aaa','qwerty'),
(2,'aba','cwerty'),
(3,'eeaa','qwtybmrty')
ON DUPLICATE KEY UPDATE uname=VALUES(uname);

-- Insert initial data into post
INSERT INTO post (pid, pname, uid, cat) VALUES 
(1,'aaa',1,'2025-06-06'),
(2,'aba',1,'2025-04-23'),
(3,'eeaa',3,'2025-05-23')
ON DUPLICATE KEY UPDATE pname=VALUES(pname);

-- Insert initial data into comment
INSERT INTO comment (c_id, c_text, p_id, u_id) VALUES 
(1,'aaa',1,1),
(2,'aba',3,2),
(3,'eeaa',2,3)
ON DUPLICATE KEY UPDATE c_text=VALUES(c_text);