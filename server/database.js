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
  // Function to connect to the database
  async connectToDatabase() {
    try {
      await pool.connect();
      console.log("  Connected to the database");
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  },
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
  // Function to register user
  async registerUser(email, first_name, last_name, password) {
    try {
      const result = await pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.users (email, first_name, last_name, password, admin) VALUES ('${email}', '${first_name}', '${last_name}', '${password}', 'false' )`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("User registered successfully");
      }
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },
  // Function to add admin user
  async registerUserAdmin(email, first_name, last_name, password) {
    try {
      const result = await pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.users (email, first_name, last_name, password, admin) VALUES ('${email}', '${first_name}', '${last_name}', '${password}', 'true' )`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Admin registered successfully");
      }
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },
  // Function update password
  async updatePassword(email, new_password) {
    try {
      const result = await pool
        .request()
        .query(
          `UPDATE quizzes.dbo.users SET password = '${new_password}' WHERE email = '${email}'`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Password updated successfully");
      }
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },

  // Function to delete user
  async deleteUser(email) {
    try {
      const result = await pool
        .request()
        .query(`DELETE FROM quizzes.dbo.users WHERE email = '${email}'`);
      if (result.rowsAffected[0] === 1) {
        console.log("User deleted successfully");
      }
      return result.recordset;
    } catch (error) {
      console.log(error);
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

  // Function to add test
  async addTest(test_name) {
    try {
      const result = await pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.tests (test_name) VALUES ('${test_name}')`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Test added successfully");
      }
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },

  // Function to edit test_id
  async editTest(test_name, new_test_name) {
    try {
      const result = await pool
        .request()
        .query(
          `UPDATE quizzes.dbo.tests SET test_name = '${new_test_name}' WHERE test_name = '${test_name}'`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Test edited successfully");
      }
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },

  // Function to get questions by test id
  async getQuestionsByTestName(test_name) {
    try {
      const result = await pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.questions WHERE test_id = (SELECT test_id FROM quizzes.dbo.tests WHERE test_name = '${test_name}')`
        );
      console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },

  // Function to add question by test id
  async addQuestionByTestName(test_name, question_text) {
    try {
      const result = await pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.questions (test_id, question_text) VALUES ((SELECT test_id FROM quizzes.dbo.tests WHERE test_name = '${test_name}'), '${question_text}')`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Question added successfully");
      }
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },

  // Function to edit question by question id
  async editQuestionByQuestionId(question_id, question_text) {
    try {
      const result = await pool
        .request()
        .query(
          `UPDATE quizzes.dbo.questions SET question_text = '${question_text}' WHERE question_id = '${question_id}'`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Question edited successfully");
      }
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  },

  // Function to get answers by question id
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
  
  // Function to add answer by question id
  async addAnswerByQuestionId(question_id, answer_text, correct) {
    try {
        const result = await pool
            .request()
            .query(
                `INSERT INTO quizzes.dbo.answers (question_id, answer_text, correct) VALUES (${question_id}, '${answer_text}', '${correct}')`
            );
        if (result.rowsAffected[0] === 1) {
            console.log("Answer added successfully");
        }
        return result.recordset;
    } catch (error) {
        console.log(error);
    }
},

};

//* For testing functions b4 exporting
// // Connect to the database and then call the functions
// async function initialize() {
//   await module.exports.connectToDatabase();

//   await module.exports.registerUser(
//     "new3@example.com",
//     "bob1",
//     "henry1",
//     "password"
//   );
// }

// // Call the initialization function
// initialize();
