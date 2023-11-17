CREATE DATABASE quizzes;
GO

USE quizzes;
GO

CREATE TABLE tests (
    test_id INT PRIMARY KEY,
    test_name VARCHAR(50) NOT NULL
);

CREATE TABLE questions (
    question_id INT PRIMARY KEY,
    test_id INT FOREIGN KEY REFERENCES tests(test_id),
    question_text VARCHAR(100) NOT NULL
);

CREATE TABLE answers (
    answer_id INT PRIMARY KEY,
    question_id INT FOREIGN KEY REFERENCES questions(question_id),
    answer_text VARCHAR(100) NOT NULL,
    correct BIT NOT NULL
);

INSERT INTO tests (test_id, test_name) VALUES (1, 'Math'), (2, 'Places'), (3, 'Shapes');

INSERT INTO questions (question_id, test_id, question_text) VALUES
    (1, 1, 'What is 1 + 1?'),
    (2, 1, 'What is 2 + 2?'),
    (3, 1, 'What is 3 + 3?'),
    (4, 1, 'What is 4 + 4?'),
    (5, 1, 'What is 5 + 5?'),
    (6, 2, 'What is the capital of Canada?'),
    (7, 2, 'What is the tallest mountain in the world?'),
    (8, 2, 'What is the largest ocean in the world?'),
    (9, 2, 'What is the smallest country in the world?'),
    (10, 2, 'What is the largest country in the world?'),
    (11, 3, 'What is the shape of a circle?'),
    (12, 3, 'What is the shape of a square?'),
    (13, 3, 'What is the shape of a triangle?'),
    (14, 3, 'What is the shape of a rectangle?'),
    (15, 3, 'What is the shape of a pentagon?');

INSERT INTO answers (answer_id, question_id, answer_text, correct) VALUES
    (1, 1, '1', 1),
    (2, 1, '2', 0),
    (3, 1, '3', 0),
    (4, 1, '4', 0),
    (5, 1, '5', 0),
    (6, 2, '3', 0),
    (7, 2, 'Mount Everest', 1),
    (8, 2, 'Pacific Ocean', 0),
    (9, 2, 'Vatican City', 0),
    (10, 2, 'Russia', 0),
    (11, 3, 'Square', 0),
    (12, 3, 'Circle', 1),
    (13, 3, 'Triangle', 0),
    (14, 3, 'Rectangle', 0),
    (15, 3, 'Pentagon', 0),
    (16, 1, '6', 0),
    (17, 1, '7', 0),
    (18, 1, '8', 0),
    (19, 1, '9', 0),
    (20, 1, '10', 0),
    (21, 2, 'Mount Kilimanjaro', 0),
    (22, 2, 'Mount Denali', 0),
    (23, 2, 'Mount Kilimanjaro', 0),
    (24, 2, 'Mount Everest', 0),
    (25, 2, 'Mount Fuji', 0),
    (26, 3, 'Hexagon', 0),
    (27, 3, 'Octagon', 0),
    (28, 3, 'Heptagon', 0),
    (29, 3, 'Rhombus', 0),
    (30, 3, 'Trapezoid', 0);
