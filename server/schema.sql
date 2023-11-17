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
    test_id INT FOREIGN KEY REFERENCES tests(test_id) ON DELETE CASCADE,
    question_text VARCHAR(100) NOT NULL
);

CREATE TABLE answers (
    answer_id INT PRIMARY KEY,
    question_id INT FOREIGN KEY REFERENCES questions(question_id) ON DELETE CASCADE,
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
    -- Answers for Question 1
    (1, 1, '1', 0),
    (2, 1, '2', 1),
    (3, 1, '3', 0),
    (4, 1, '4', 0),
    
    -- Answers for Question 2
    (5, 2, '3', 0),
    (6, 2, '4', 0),
    (7, 2, '5', 0),
    (8, 2, '6', 1),
    
    -- Answers for Question 3
    (9, 3, '4', 0),
    (10, 3, '6', 0),
    (11, 3, '9', 1),
    (12, 3, '12', 0),
    
    -- Answers for Question 4
    (13, 4, '7', 0),
    (14, 4, '8', 1),
    (15, 4, '10', 0),
    (16, 4, '14', 0),
    
    -- Answers for Question 5
    (17, 5, '9', 0),
    (18, 5, '10', 0),
    (19, 5, '11', 1),
    (20, 5, '15', 0),
    
    -- Answers for Question 6
    (21, 6, 'Ottawa', 1),
    (22, 6, 'Toronto', 0),
    (23, 6, 'Vancouver', 0),
    (24, 6, 'Montreal', 0),
    
    -- Answers for Question 7
    (25, 7, 'Mount Everest', 1),
    (26, 7, 'K2', 0),
    (27, 7, 'Kangchenjunga', 0),
    (28, 7, 'Lhotse', 0),
    
    -- Answers for Question 8
    (29, 8, 'Atlantic Ocean', 0),
    (30, 8, 'Indian Ocean', 0),
    (31, 8, 'Southern Ocean', 0),
    (32, 8, 'Pacific Ocean', 1),
    
    -- Answers for Question 9
    (33, 9, 'Vatican City', 1),
    (34, 9, 'Monaco', 0),
    (35, 9, 'Nauru', 0),
    (36, 9, 'Tuvalu', 0),
    
    -- Answers for Question 10
    (37, 10, 'Russia', 1),
    (38, 10, 'Canada', 0),
    (39, 10, 'United States', 0),
    (40, 10, 'China', 0),
    
    -- Answers for Question 11
    (41, 11, 'Circle', 1),
    (42, 11, 'Square', 0),
    (43, 11, 'Triangle', 0),
    (44, 11, 'Rectangle', 0),
    
    -- Answers for Question 12
    (45, 12, 'Circle', 0),
    (46, 12, 'Square', 1),
    (47, 12, 'Triangle', 0),
    (48, 12, 'Rectangle', 0),
    
    -- Answers for Question 13
    (49, 13, 'Circle', 0),
    (50, 13, 'Square', 0),
    (51, 13, 'Triangle', 1),
    (52, 13, 'Rectangle', 0),
    
    -- Answers for Question 14
    (53, 14, 'Circle', 0),
    (54, 14, 'Square', 0),
    (55, 14, 'Triangle', 0),
    (56, 14, 'Rectangle', 1),
    
    -- Answers for Question 15
    (57, 15, 'Circle', 0),
    (58, 15, 'Square', 0),
    (59, 15, 'Triangle', 0),
    (60, 15, 'Pentagon', 1);