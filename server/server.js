const express = require('express');
const app = express();
const port = 5544; 
const path = require('path');
const cors = require('cors');

const {
    connectToDatabase,
    getTests,
    getQuestionsByTestId
} = require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

}));

// Start connection to DB
connectToDatabase();

app.get('/tests', async (req, res) => {
    const tests = await getTests();
    res.json(tests);
});

app.get('/questions/:test_id', async (req, res) => {
    const questions = await getQuestionsByTestId(req.params.test_id);
    res.json(questions);
});

app.listen(port, () => {
    console.log("Server is listening on port "+ port);
  });