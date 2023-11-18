const express = require('express');
const app = express();
const port = 5544; 
// const path = require('path');
const cors = require('cors');

const {
    connectToDatabase,
    login,
    registerUser,    
    getTests,
    getQuestionsByTestId,
    getAnswersByQuestionId
} = require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

}));

// Start connection to DB
connectToDatabase();

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = await login(email, password);
    res.json(users);
});

app.post('/register', async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const users = await registerUser(email, first_name, last_name, password);
    res.json(users);
});

app.get('/tests', async (req, res) => {
    const tests = await getTests();
    res.json(tests);
});

app.get('/questions/:test_id', async (req, res) => {
    const questions = await getQuestionsByTestId(req.params.test_id);
    res.json(questions);
});

app.get('/answers/:question_id', async (req, res) => {
    const answers = await getAnswersByQuestionId(req.params.question_id);
    res.json(answers);
});

app.listen(port, () => {
    console.log("Server is listening on port "+ port);
});