create database masala;
-- drop DATABASE masala;
use masala;

CREATE TABLE user (
	user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    lastname VARCHAR(100),
    birth_date DATE,
    dni VARCHAR(20),
    phone VARCHAR(30),
    address VARCHAR(100),
    zip_code VARCHAR(20),
    city VARCHAR(50),
    province VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    user_img VARCHAR(200),
    type tinyint NOT NULL default 2, -- 1 admin | 2 user
    is_deleted BOOLEAN  NOT NULL default 0,
    is_disabled BOOLEAN NOT NULL default 1
);

CREATE TABLE course(
	course_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    duration VARCHAR(20),
    price DECIMAL(7,2) NOT NULL DEFAULT 0, -- 99999,99
    register_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description VARCHAR(255),
    course_img VARCHAR(200),
    is_deleted BOOLEAN NOT NULL default 0,
    is_visible BOOLEAN NOT NULL default 0,
    is_disabled BOOLEAN NOT NULL default 0,
    creator_user_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_user_1 FOREIGN KEY (creator_user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE register( -- un user se apunta a un curso
    user_id INT UNSIGNED NOT NULL,
	course_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, course_id),
	status tinyint NOT NULL default 1,
    register_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- fecha en la que un alumno se apunta un curso
    exam_path VARCHAR(200),
    CONSTRAINT fk_user_2 FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_course_1 FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE CASCADE
); 

CREATE TABLE tag(
	tag_id INT UNSIGNED NOT NULL PRIMARY KEY,
	name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE course_tag(
	tag_id INT UNSIGNED NOT NULL,
	course_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY(tag_id, course_id),
    CONSTRAINT fk_tag_1 FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_course_2 FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE subject(
	course_id BIGINT unsigned NOT NULL,
	subject_id TINYINT UNSIGNED NOT NULL, -- hasta 255 temas en un curso
	primary key(course_id, subject_id),
	name VARCHAR(50) NOT NULL,
	duration VARCHAR(10),
	creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_course_3 FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE resource(
	resource_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	subject_id TINYINT UNSIGNED NOT NULL,
	course_id BIGINT unsigned NOT NULL,	
	type tinyint NOT NULL,
	path VARCHAR(200) NOT NULL,
	CONSTRAINT fk_subject_1 FOREIGN KEY (course_id, subject_id) REFERENCES subject(course_id, subject_id) ON DELETE CASCADE ON UPDATE CASCADE
);


SELECT * FROM user;
SELECT * FROM course;
SELECT * FROM subject;
SELECT * FROM resource;
SELECT * FROM tag;
SELECT * FROM register;

INSERT INTO user (name, email, password, type, is_disabled) VALUES ("administrador", "masalahead.av@pm.me", "$2b$08$BQiirSgzg1.D9MqkMuKGXuh8f/Iz6HKNq7AuTa.Illxa4LURAh6cu", 1, 0);





