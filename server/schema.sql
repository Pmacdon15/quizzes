/*
This SQL script creates a database schema for a quizzes application. It defines the tables and inserts sample data for users, tests, questions, and answers.

Tables:
- users: Stores user information including email, first name, last name, password, and admin status.
- tests: Stores test information including test name.
- questions: Stores question information including the test it belongs to and the question text.
- answers: Stores answer information including the question it belongs to, the answer text, and whether it is correct or not.

Sample Data:
- The script inserts sample data into the users, tests, questions, and answers tables to demonstrate the functionality of the application.

Note: This script assumes the existence of a database named "quizzes" and uses it as the current database.
*/
CREATE DATABASE quizzes;
GO

USE quizzes;
GO

CREATE TABLE users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BIT NOT NULL
);

CREATE TABLE tests (
    test_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    test_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE questions (
    question_id INT IDENTITY(1,1) PRIMARY KEY ,
    test_id INT FOREIGN KEY REFERENCES tests(test_id) ON DELETE CASCADE NOT NULL,
    question_text VARCHAR(250) UNIQUE NOT NULL
);

CREATE TABLE answers (
    answer_id INT IDENTITY(1,1) PRIMARY KEY,
    question_id INT FOREIGN KEY REFERENCES questions(question_id) ON DELETE CASCADE NOT NULL,
    answer_text VARCHAR(250) NOT NULL,
    correct BIT NOT NULL
);

CREATE TABLE results (
    result_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    test_id INT FOREIGN KEY REFERENCES tests(test_id) ON DELETE CASCADE NOT NULL,
    test_name VARCHAR(50) NOT NULL,
    total_correct INT NOT NULL,
    total_questions INT NOT NULL,    
    date_taken DATETIME NOT NULL
);

INSERT INTO users (email, first_name, last_name, password, admin) 
VALUES 
    ('admin@example.com', 'Admin', 'User', 'password', 1),
    ('user@example.com', 'Regular', 'User', 'password', 0);


INSERT INTO tests (test_name) VALUES ('Math'), ('Places'), ('Shapes');

INSERT INTO questions (test_id, question_text) VALUES
    (1, 'What is 1 + 1?'),
    (1, 'What is 2 + 2?'),
    (1, 'What is 3 + 3?'),
    (1, 'What is 4 + 4?'),
    (1, 'What is 5 + 5?'),
    (2, 'What is the capital of Canada?'),
    (2, 'What is the tallest mountain in the world?'),
    (2, 'What is the largest ocean in the world?'),
    (2, 'What is the smallest country in the world?'),
    (2, 'What is the largest country in the world?'),
    (3, 'What is the shape of a circle?'),
    (3, 'What is the shape of a square?'),
    (3, 'What is the shape of a triangle?'),
    (3, 'What is the shape of a rectangle?'),
    (3, 'What is the shape of a pentagon?');

INSERT INTO answers (question_id, answer_text, correct) VALUES
    -- Answers for Question 1
    (1, '1', 0),
    (1, '2', 1),
    (1, '3', 0),
    (1, '4', 0),
    
    -- Answers for Question 2
    (2, '3', 0),
    (2, '4', 1),
    (2, '5', 0),
    (2, '6', 0),
    
    -- Answers for Question 3
    (3, '4', 0),
    (3, '6', 1),
    (3, '9', 0),
    (3, '12', 0),
    
    -- Answers for Question 4
    (4, '7', 0),
    (4, '8', 1),
    (4, '10', 0),
    (4, '14', 0),
    
    -- Answers for Question 5
    (5, '9', 0),
    (5, '10', 1),
    (5, '11', 0),
    (5, '15', 0),
    
    -- Answers for Question 6
    (6, 'Ottawa', 1),
    (6, 'Toronto', 0),
    (6, 'Vancouver', 0),
    (6, 'Montreal', 0),
    
    -- Answers for Question 7
    (7, 'Mount Everest', 1),
    (7, 'K2', 0),
    (7, 'Kangchenjunga', 0),
    (7, 'Lhotse', 0),
    
    -- Answers for Question 8
    (8, 'Atlantic Ocean', 0),
    (8, 'Indian Ocean', 0),
    (8, 'Southern Ocean', 0),
    (8, 'Pacific Ocean', 1),
    
    -- Answers for Question 9
    (9, 'Vatican City', 1),
    (9, 'Monaco', 0),
    (9, 'Nauru', 0),
    (9, 'Tuvalu', 0),
    
    -- Answers for Question 10
    (10, 'Russia', 1),
    (10, 'Canada', 0),
    (10, 'United States', 0),
    (10, 'China', 0),
    
    -- Answers for Question 11
    (11, 'Circle', 1),
    (11, 'Square', 0),
    (11, 'Triangle', 0),
    (11, 'Rectangle', 0),
    
    -- Answers for Question 12
    (12, 'Circle', 0),
    (12, 'Square', 1),
    (12, 'Triangle', 0),
    (12, 'Rectangle', 0),
    
    -- Answers for Question 13
    (13, 'Circle', 0),
    (13, 'Square', 0),
    (13, 'Triangle', 1),
    (13, 'Rectangle', 0),
    
    -- Answers for Question 14
    (14, 'Circle', 0),
    (14, 'Square', 0),
    (14, 'Triangle', 0),
    (14, 'Rectangle', 1),
    
    -- Answers for Question 15
    (15, 'Circle', 0),
    (15, 'Square', 0),
    (15, 'Triangle', 0),
    (15, 'Pentagon', 1);