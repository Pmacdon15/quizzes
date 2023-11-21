const express = require("express");
const app = express();
const port = 5544;
const cors = require("cors");

// Import functions from database.js
const Database = require("./database.js");

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
Database.connectToDatabase();

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Database.login(email, password);
  if (user === null || user === undefined) {
    res.status(400).send("Something when wrong with login");
  } else {
    res.status(200).json(user);
  }
});

// Get user by email
app.get("/user/:email", async (req, res) => {
  const user = await Database.getUsersByEmail(req.params.email);
  if (user === null || user === undefined) {
    res.status(400).send("Something when wrong with login");
  } else {
    res.status(200).json(user);
  }
});

// Register user
app.post("/user", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const user = await Database.registerUser(
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
  const users = await Database.registerUserAdmin(
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
  const users = await Database.updatePassword(req.params.email, new_password);
  if (users === null || users === undefined) {
    res.status(400).send("Something when wrong with updating password.");
  } else {
    res.status(200).json(users);
  }
});

// Delete user
app.delete("/user/:email", async (req, res) => {
  const users = await Database.deleteUser(req.params.email);
  if (users === null || users === undefined) {
    res.status(400).send("Something when wrong with deleting user.");
  } else {
    res.status(200).json(users);
  }
});

// Get all tests
app.get("/tests", async (req, res) => {
  const tests = await Database.getTests();
  if (tests === null || tests === undefined) {
    res.status(400).send("Something when wrong with getting tests.");
  } else {
    res.status(200).json(tests);
  }  
});

// Add test
app.post("/test", async (req, res) => {
  const { test_name } = req.body;
  const tests = await Database.addTest(test_name);
  if (tests === null || tests === undefined) {
    res.status(400).send("Something when wrong with adding a test.");
  } else {
    res.status(200).json(tests);
  }
});

// Edit test name
app.put("/test/:test_name", async (req, res) => {
  const { new_test_name } = req.body;
  //console.log(req.params.test_name);
  const test = await Database.editTest(req.params.test_name, new_test_name);
  if (test === null || test === undefined) {
    res.status(400).send("Something when wrong with editing a test.");
  } else {
    res.status(200).json(test);
  }
});

// Get questions by test name
app.get("/questions/:test_name", async (req, res) => {
  const questions = await Database.getQuestionsByTestName(req.params.test_name);
  res.json(questions);
});

// Add question by test name
app.post("/question/:test_name", async (req, res) => {
  const { question_text } = req.body;
  const question = await Database.addQuestionByTestName(
    req.params.test_name,
    question_text
  );
  res.json(question);
});

// Edit question by by question id
app.put("/question/:question_id", async (req, res) => {
  const { question_text } = req.body;
  const question = await Database.editQuestionByQuestionId(
    req.params.question_id,
    question_text
  );
  res.json(question);
});

// Delete question by question id
app.delete("/question/:question_id", async (req, res) => {
  const question = await Database.deleteQuestionByQuestionId(
    req.params.question_id
  );
  res.json(question);
});

// Get all answers
app.get("/answers", async (req, res) => {
  const answers = await Database.getAnswers();
  res.json(answers);
});

// Get answers by question id
app.get("/answer/:question_id", async (req, res) => {
  const answers = await Database.getAnswersByQuestionId(req.params.question_id);
  res.json(answers);
});

// Add answer by question id
app.post("/answer/:question_id", async (req, res) => {
  const { new_answer_text, correct } = req.body;
  const answer = await Database.addAnswerByQuestionId(
    req.params.question_id,
    new_answer_text,
    correct
  );
  res.json(answer);
});

// Edit answer by answer id
app.put("/answer/:answer_id", async (req, res) => {
  const { new_answer_text, correct } = req.body;
  const answer = await Database.editAnswerByAnswerId(
    req.params.answer_id,
    new_answer_text,
    correct
  );
  res.json(answer);
});

// Delete answer by answer id
app.delete("/answer/:answer_id", async (req, res) => {
  const answer = await Database.deleteAnswerByAnswerId(req.params.answer_id);
  res.json(answer);
});

// Start server
app.listen(port, () => {
  displayGraphic(port);
});
