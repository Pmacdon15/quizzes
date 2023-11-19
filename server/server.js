const express = require('express');
const app = express();
const port = 5544; 
// const path = require('path');
const cors = require('cors');

const {
    connectToDatabase,
    login,
    registerUser,
    registerUserAdmin,
    updatePassword,
    deleteUser,    
    getTests,
    addTest,
    editTest,
    getQuestionsByTestName,
    addQuestionByTestName,
    editQuestionByQuestionId,
    getAnswersByQuestionId,
    addAnswerByQuestionId,
    editAnswerByAnswerId,
} = require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

}));

// Start connection to DB
connectToDatabase();

// Login 
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = await login(email, password);
    res.json(users);
});

// Register user
app.post('/user', async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const users = await registerUser(email, first_name, last_name, password);
    res.json(users);
});

// Register admin user
app.post('/userAdmin', async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const users = await registerUserAdmin(email, first_name, last_name, password);
    res.json(users);
});

// Update password
app.put('/user/:email', async (req, res) => {
    const { new_password } = req.body;
    const users = await updatePassword(req.params.email, new_password);
    res.json(users);
});

// Delete user
app.delete('/user/:email', async (req, res) => {
    const users = await deleteUser(req.params.email);
    res.json(users);
});

// Get all tests
app.get('/tests', async (req, res) => {
    const tests = await getTests();
    res.json(tests);
});

// Add test
app.post('/test', async (req, res) => {
    const { test_name } = req.body;
    const tests = await addTest(test_name);
    res.json(tests);
});

// Edit test name 
app.put('/test/:test_name', async (req, res) => {
    const { new_test_name } = req.body;
    const tests = await editTest(req.params.test_name, new_test_name);
    res.json(tests);
});

// Get questions by test name
app.get('/questions/:test_name', async (req, res) => {
    const questions = await getQuestionsByTestName(req.params.test_name);
    res.json(questions);
});

// Add question by test name
app.post('/question/:test_name', async (req, res) => {
    const { question_text } = req.body;
    const question = await addQuestionByTestName(req.params.test_name, question_text);
    res.json(question);
});

// Edit question by by question id
app.put('/question/:question_id', async (req, res) => {
    const { question_text } = req.body;
    const question = await editQuestionByQuestionId(req.params.question_id, question_text);
    res.json(question);
});

// Get answers by question id
app.get('/answers/:question_id', async (req, res) => {
    const answers = await getAnswersByQuestionId(req.params.question_id);
    res.json(answers);
});

// Add answer by question id
app.post('/answer/:question_id', async (req, res) => {
    const { answer_text, correct } = req.body;
    const answer = await addAnswerByQuestionId(req.params.question_id, answer_text, correct);
    res.json(answer);
});

// Edit answer by answer id
app.put('/answer/:answer_id', async (req, res) => {
    const { new_answer_text, correct } = req.body;
    const answer = await editAnswerByAnswerId(req.params.answer_id, new_answer_text, correct);
    res.json(answer);
});



app.listen(port, () => {
    console.log(`\x1b[31m    
  ____        _                  
 / __ \\      (_)                 
| |  | |_   _ _ ___________  ___ 
| |  | | | | | |_  /_  / _ \\/ __|
| |__| | |_| | |/ / / /  __/\\__ \\
 \\___\\_\\\\__,_|_/___/___\\___||___/
 \x1b[34m Backend server is listening on port ${port} \x1b[0m`);
});