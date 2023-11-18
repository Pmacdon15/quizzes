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

app.post('/user', async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const users = await registerUser(email, first_name, last_name, password);
    res.json(users);
});

app.post('/userAdmin', async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const users = await registerUserAdmin(email, first_name, last_name, password);
    res.json(users);
});

app.put('/user/:email', async (req, res) => {
    const { password } = req.body;
    const users = await updatePassword(req.params.email, password);
    res.json(users);
});


app.delete('/user/:email', async (req, res) => {
    const users = await deleteUser(req.params.email);
    res.json(users);
});

app.get('/tests', async (req, res) => {
    const tests = await getTests();
    res.json(tests);
});

app.post('/test', async (req, res) => {
    const { test_name } = req.body;
    const tests = await addTest(test_name);
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
    console.log(`\x1b[31m    
  ____        _                  
 / __ \\      (_)                 
| |  | |_   _ _ ___________  ___ 
| |  | | | | | |_  /_  / _ \\/ __|
| |__| | |_| | |/ / / /  __/\\__ \\
 \\___\\_\\\\__,_|_/___/___\\___||___/
 \x1b[34m Backend server is listening on port ${port} \x1b[0m`);
});