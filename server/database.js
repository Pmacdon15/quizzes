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
  async updatePassword(email, password) {
    try {
      const result = await pool
        .request()
        .query(
          `UPDATE quizzes.dbo.users SET password = '${password}' WHERE email = '${email}'`
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
