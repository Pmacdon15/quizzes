const sql = require("mssql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Connection configuration
const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_HOST,
  database: process.env.MSSQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Create a pool object
const pool = new sql.ConnectionPool(config);

module.exports = {
  // Function for login
  async login(email, password) {
    try {
      const result = await pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.users WHERE email= '${email}' AND password = '${password}'`
        );
      delete result.recordset[0].password;
      console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },
  // Function to connect to the database
  async connectToDatabase() {
    try {
      await pool.connect();
      console.log("Connected to the database");
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  },

  // Function to get tests
  async getTests() {
    try {
      const result = await pool
        .request()
        .query("SELECT * FROM quizzes.dbo.tests");
      console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },
  
  async getQuestionsByTestId(test_id) {
    try {
      const result = await pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.questions WHERE test_id = ${test_id}`
        );
      console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },

  async getAnswersByQuestionId(question_id) {
    try {
      const result = await pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.answers WHERE question_id = ${question_id}`
        );
      console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },
};

// //* For testing functions b4 exporting
// // Connect to the database and then call the functions
// async function initialize() {
//   await module.exports.connectToDatabase();
//   //await getTests();
//   //await getQuestions();
//   //await getQuestionsByTestId(1);
//   await module.exports.login("user@example.com", "hashed_password");
// }

// // Call the initialization function
// initialize();
