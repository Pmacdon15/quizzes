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
  const users = await Database.login(email, password);
  res.json(users);
});

// Register user
app.post("/user", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const users = await Database.registerUser(email, first_name, last_name, password);
  res.json(users);
});

// Register admin user
app.post("/userAdmin", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const users = await Database.registerUserAdmin(email, first_name, last_name, password);
  res.json(users);
});

// Update password
app.put("/user/:email", async (req, res) => {
  const { new_password } = req.body;
  const users = await Database.updatePassword(req.params.email, new_password);
  res.json(users);
});

// Delete user
app.delete("/user/:email", async (req, res) => {
  const users = await Database.deleteUser(req.params.email);
  res.json(users);
});

// Get all tests
app.get("/tests", async (req, res) => {
  const tests = await Database.getTests();
  res.json(tests);
});

// Add test
app.post("/test", async (req, res) => {
  const { test_name } = req.body;
  const tests = await Database.addTest(test_name);
  res.json(tests);
});

// Edit test name
app.put("/test/:test_name", async (req, res) => {
  const { new_test_name } = req.body;
  const tests = await Database.editTest(req.params.test_name, new_test_name);
  res.json(tests);
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
