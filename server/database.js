const sql = require('mssql');

// Connection configuration
const config = {
  user: 'pmacd',
  password: 'asdfghjkl3388',
  server: 'WORKSTATION',
  database: 'quizzes',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Create a pool object
const pool = new sql.ConnectionPool(config);

// Function to connect to the database
async function connectToDatabase() {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

// Function to get tests
async function getTests() {
  try {
    const result = await pool.request().query('SELECT * FROM quizzes.dbo.tests');
    console.dir(result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

// Function to get questions
async function getQuestions() {
  try {
    const result = await pool.request().query('SELECT * FROM quizzes.dbo.questions');
    console.dir(result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getQuestionsByTestId(test_id) {
  try {
    const result = await pool.request().query(`SELECT * FROM quizzes.dbo.questions WHERE test_id = ${test_id}`);
    console.dir(result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}

async function getAnswersByQuestionId(question_id) {
  try {
    const result = await pool.request().query(`SELECT * FROM quizzes.dbo.answers WHERE question_id = ${question_id}`);
    console.dir(result.recordset);
    return result.recordset;
  } catch (error) {
    console.log(error);
  }
}


// Connect to the database and then call the functions
async function initialize() {
  await connectToDatabase();
  //await getTests();
  //await getQuestions();
  //await getQuestionsByTestId(1);
  await getAnswersByQuestionId(2);
}

// Call the initialization function
initialize();
