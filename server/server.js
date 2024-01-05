/**
 * @fileoverview This file contains the server code for the quizzes application.
 * It sets up an Express server, defines routes for various API endpoints, and connects to a databaseInstance.
 * The server listens on port 5544 and allows cross-origin requests from http://localhost:3000.
 * The routes handle user authentication, user management, test management, question management, and answer management.
 * The server starts by connecting to the databaseInstance and then starts listening on the specified port.
 * @requires express
 * @requires cors
 * @requires ./database.js
 * @requires ./graphic
 */
const express = require("express");
const app = express();
const port = 5544;
const cors = require("cors");

// Import functions from databaseInstance.js
const Database = require("./database.js");

// Create a new instance of the databaseInstance class
const databaseInstance = new Database();

// Import function from graphic.js
const { displayGraphic } = require("./graphic");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for cross-origin requests
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Start connection to DB
databaseInstance.connectToDatabase();

// Login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await databaseInstance.login(email, password);
  if (user === null || user === undefined) {
    res.status(400).send("Something when wrong with login.");
  } else {
    res.status(200).json(user);
  }
});

// Get user by email
app.get("/user/:email", async (req, res) => {
  const user = await databaseInstance.getUsersByEmail(req.params.email);
  if (user === null || user === undefined) {
    res.status(400).send("Something when wrong with getting user.");
  } else {
    res.status(200).json(user);
  }
});

// Register user
app.post("/user", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const user = await databaseInstance.registerUser(
    email,
    first_name,
    last_name,
    password
  );
  if (user === null || user === undefined) {
    res.status(400).send("Something when wrong with adding a user.");
  } else {
    res.status(200).json(user);
  }
});

// Register admin user
app.post("/userAdmin", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const users = await databaseInstance.registerUserAdmin(
    email,
    first_name,
    last_name,
    password
  );
  if (users === null || users === undefined) {
    res.status(400).send("Something when wrong with adding an admin user.");
  } else {
    res.status(200).json(users);
  }
});

// Update password
app.put("/user/:email", async (req, res) => {
  const { new_password } = req.body;
  const users = await databaseInstance.updatePassword(req.params.email, new_password);
  if (users === null || users === undefined) {
    res.status(400).send("Something when wrong with updating password.");
  } else {
    res.status(200).json(users);
  }
});

// Delete user
app.delete("/user/:email", async (req, res) => {
  const users = await databaseInstance.deleteUser(req.params.email);
  if (users === null || users === undefined) {
    res.status(400).send("Something when wrong with deleting user.");
  } else {
    res.status(200).json(users);
  }
});

// Get all tests
app.get("/tests", async (req, res) => {
  const tests = await databaseInstance.getTests();
  if (tests === null || tests === undefined) {
    res.status(400).send("Something when wrong with getting tests.");
  } else {
    res.status(200).json(tests);
  }
});

// Add test
app.post("/test", async (req, res) => {
  const { test_name } = req.body;
  const tests = await databaseInstance.addTest(test_name);
  if (tests === null || tests === undefined) {
    res.status(400).send("Something when wrong with adding a test.");
  } else {
    res.status(200).json(tests);
  }
});

// Edit test name
app.put("/test/:test_name", async (req, res) => {
  const { new_test_name } = req.body;
  const test = await databaseInstance.editTest(req.params.test_name, new_test_name);
  if (test === null || test === undefined) {
    res.status(400).send("Something when wrong with editing a test.");
  } else {
    res.status(200).json(test);
  }
});

// Delete test
app.delete("/test/:test_name", async (req, res) => {
  const test = await databaseInstance.deleteTest(req.params.test_name);
  if (test === null || test === undefined) {
    res.status(400).send("Something when wrong with deleting a test.");
  } else {
    res.status(200).json(test);
  }
});

// Get questions by test name
app.get("/questions/:test_name", async (req, res) => {
  const questions = await databaseInstance.getQuestionsByTestName(req.params.test_name);
  if (questions === null || questions === undefined) {
    res.status(400).send("Something when wrong with getting questions.");
  } else {
    res.status(200).json(questions);
  }
});

// Add question by test name
app.post("/question/:test_name", async (req, res) => {
  const { question_text } = req.body;
  const question = await databaseInstance.addQuestionByTestName(
    req.params.test_name,
    question_text
  );
  if (question === null || question === undefined) {
    res.status(400).send("Something when wrong with adding a question.");
  } else {
    res.status(200).json(question);
  }
});

// Edit question by by question id
app.put("/question/:question_id", async (req, res) => {
  const { new_question_text } = req.body;
  const question = await databaseInstance.editQuestionByQuestionId(
    req.params.question_id,
    new_question_text
  );
  if (question === null || question === undefined) {
    res.status(400).send("Something when wrong with editing a question.");
  } else {
    res.status(200).json(question);
  }
});

// Delete question by question id
app.delete("/question/:question_id", async (req, res) => {
  const question = await databaseInstance.deleteQuestionByQuestionId(
    req.params.question_id
  );
  if (question === null || question === undefined) {
    res.status(400).send("Something when wrong with deleting a question.");
  } else {
    res.status(200).json(question);
  }
});

// Get all answers
app.get("/answers", async (req, res) => {
  const answers = await databaseInstance.getAnswers();
  res.json(answers);
});

// Get answers by test name
app.get("/answers/:test_name", async (req, res) => {
  const answers = await databaseInstance.getAnswersByTestName(req.params.test_name);
  if (answers === null || answers === undefined) {
    res.status(400).send("Something when wrong with getting answers.");
  } else {
    res.status(200).json(answers);
  }
});

// Add answer by question id
app.post("/answer/:question_id", async (req, res) => {
  const { new_answer_text, correct } = req.body;
  const answer = await databaseInstance.addAnswerByQuestionId(
    req.params.question_id,
    new_answer_text,
    correct
  );
  if (answer === null || answer === undefined) {
    res.status(400).send("Something when wrong with adding an answer.");
  }else {
    res.status(200).json(answer);
  }
});

// Edit answer by answer id
app.put("/answer/:answer_id", async (req, res) => {
  const { new_answer_text, correct } = req.body;
  const answer = await databaseInstance.editAnswerByAnswerId(
    req.params.answer_id,
    new_answer_text,
    correct
  );
  if (answer === null || answer === undefined) {
    res.status(400).send("Something when wrong with editing an answer.");
  } else {
    res.status(200).json(answer);
  }
});

// Delete answer by answer id
app.delete("/answer/:answer_id", async (req, res) => {
  const answer = await databaseInstance.deleteAnswerByAnswerId(req.params.answer_id);
  if (answer === null || answer === undefined) {
    res.status(400).send("Something when wrong with deleting an answer.");
  } else {
    res.status(200).json(answer);
  }
});

// Post results
app.post("/results", async (req, res) => {
  const { user_email, test_name, total_correct, total_questions } = req.body;
  const results = await databaseInstance.postResults(user_email, test_name, total_correct, total_questions);
  if (results === null || results === undefined) {
    res.status(400).send("Something when wrong with posting results.");
  } else {
    res.status(200).json(results);
  }
});

// Start server
app.listen(port, () => {
  displayGraphic(port);
});
