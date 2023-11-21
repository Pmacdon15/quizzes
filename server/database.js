const sql = require("mssql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const database = process.env.MSSQL_DATABASE;

class Database {
  constructor() {
    const config = {
      user: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASSWORD,
      server: process.env.MSSQL_HOST,
      database: database,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };

    this.configString = JSON.stringify(config);
    this.pool = new sql.ConnectionPool(config);
  }

  // Function to connect to the database
  async connectToDatabase() {
    try {
      await this.pool.connect();
      console.log("\x1b[33mConnected to the database!!\x1b[0m");
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  }

  // Function for login
  async login(email, password) {
    try {
      const result = await this.pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.users WHERE email= '${email}' AND password = '${password}'`
        );
      delete result.recordset[0].password;
      console.log("User logged in successfully");
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get users By email
  async getUsersByEmail(email) {
    try {
      const result = await this.pool
        .request()
        .query(`SELECT * FROM quizzes.dbo.users WHERE email = '${email}'`);
      delete result.recordset[0].password;
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to register user
  async registerUser(email, first_name, last_name, password) {
    try {
      const result = await this.pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.users (email, first_name, last_name, password, admin) VALUES ('${email}', '${first_name}', '${last_name}', '${password}', 'false' )`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("User registered successfully");
        const user = this.getUsersByEmail(email);
        return user;
        //return result.recordset;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to add admin user
  async registerUserAdmin(email, first_name, last_name, password) {
    try {
      const result = await this.pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.users (email, first_name, last_name, password, admin) VALUES ('${email}', '${first_name}', '${last_name}', '${password}', 'true' )`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Admin registered successfully");
        const user = this.getUsersByEmail(email);
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function update password
  async updatePassword(email, new_password) {
    try {
      if (new_password === undefined) {
        //console.log("New password is undefined. Cannot update password.");
        throw new Error("New password is undefined. Cannot update password.");
      }
      const result = await this.pool
        .request()
        .query(
          `UPDATE quizzes.dbo.users SET password = '${new_password}' WHERE email = '${email}'`
        );

      console.log("Password updated successfully");
      const user = this.getUsersByEmail(email);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to delete user
  async deleteUser(email) {
    try {
      const user = this.getUsersByEmail(email);
      const result = await this.pool
        .request()
        .query(`DELETE FROM quizzes.dbo.users WHERE email = '${email}'`);
      if (result.rowsAffected[0] === 1) {
        console.log("User deleted successfully");
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get tests
  async getTests() {
    try {
      const result = await this.pool
        .request()
        .query("SELECT * FROM quizzes.dbo.tests");
      //console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get tests by test name
  async getTestsByName(test_name) {
    try {
      const result = await this.pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.tests WHERE test_name = '${test_name}'`
        );
      //console.dir(result);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to add test
  async addTest(test_name) {
    try {
      if (test_name === undefined) {
        //console.log("Test name is undefined. Cannot add test.");
        throw new Error("Test name is undefined. Cannot add test.");
      }
      const result = await this.pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.tests (test_name) VALUES ('${test_name}')`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Test added successfully");
        const test = this.getTests();
        return test;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to edit test name by test name
  async editTest(test_name, new_test_name) {
    try {
      if (new_test_name === undefined) {
        throw new Error("New test name is undefined. Cannot edit test.");
      }
      const result = await this.pool
        .request()
        .query(
          `UPDATE quizzes.dbo.tests SET test_name = '${new_test_name}' WHERE test_name = '${test_name}'`
        );
      //console.log("Generated SQL query:", query);
      if (result.rowsAffected[0] === 1) {
        console.log("Test edited successfully");
        const test = this.getTestsByName(new_test_name);
        return test;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get questions by test id
  async getQuestionsByTestName(test_name) {
    try {
      const result = await this.pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.questions WHERE test_id = (SELECT test_id FROM quizzes.dbo.tests WHERE test_name = '${test_name}')`
        );
      if (result.recordset.length > 0) {
        console.log("Questions retrieved successfully");
        //console.dir(result.recordset);
        return result.recordset;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get question by question id
  async getQuestionByQuestionId(question_id) {
    try {
      const result = await this.pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.questions WHERE question_id = '${question_id}'`
        );
      if (result.recordset.length > 0) {
        //console.log("Question retrieved successfully");
        return result.recordset;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to add question by test id
  async addQuestionByTestName(test_name, question_text) {
    try {
      if (question_text === undefined) {
        throw new Error("Question text is undefined. Cannot add question.");
      }
      const result = await this.pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.questions (test_id, question_text) VALUES ((SELECT test_id FROM quizzes.dbo.tests WHERE test_name = '${test_name}'), '${question_text}')`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Question added successfully");
        const question_id = await this.pool
          .request()
          .query(
            `SELECT question_id FROM quizzes.dbo.questions WHERE question_text = '${question_text}'`
          );
        const question = await this.getQuestionByQuestionId(
          question_id.recordset[0].question_id
        ); // Await here
        return question;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to edit question by question id
  async editQuestionByQuestionId(question_id, question_text) {
    try {
      if (question_text === undefined) {
        throw new Error("Question text is undefined. Cannot edit question.");
      }
      const result = await this.pool
        .request()
        .query(
          `UPDATE quizzes.dbo.questions SET question_text = '${question_text}' WHERE question_id = '${question_id}'`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Question edited successfully");
        const question = await this.getQuestionByQuestionId(question_id);
        return question;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to delete question by question id
  async deleteQuestionByQuestionId(question_id) {
    try {
      const deletedQuestion = await this.getQuestionByQuestionId(question_id);
      const result = await this.pool
        .request()
        .query(
          `DELETE FROM quizzes.dbo.questions WHERE question_id = '${question_id}'`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Question deleted successfully");
        return deletedQuestion;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get all answers
  async getAnswers() {
    try {
      const result = await this.pool
        .request()
        .query("SELECT * FROM quizzes.dbo.answers");
      console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get answers by question id
  async getAnswersByQuestionId(question_id) {
    try {
      const result = await this.pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.answers WHERE question_id = ${question_id}`
        );
      console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to get answer by answer id
  async getAnswerByAnswerId(answer_id) {
    try {
      const result = await this.pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.answers WHERE answer_id = '${answer_id}'`
        );
      //console.dir(result.recordset);
      return result.recordset;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to add answer by question id
  async addAnswerByQuestionId(question_id, answer_text, correct) {
    try {
      if (answer_text === undefined || correct === undefined) {
        throw new Error("Field Answer_text or correct is undefined. Cannot add answer.");
      }      
      const result = await this.pool
        .request()
        .query(
          `INSERT INTO quizzes.dbo.answers (question_id, answer_text, correct) VALUES (${question_id}, '${answer_text}', '${correct}')`
        );
      const answer_id = await this.pool
        .request()
        .query(
          `SELECT answer_id FROM quizzes.dbo.answers WHERE answer_text = '${answer_text}'`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Answer added successfully");
        const answer = await this.getAnswerByAnswerId(
          answer_id.recordset[0].answer_id
        );
        return answer;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to edit answer by answer id
  async editAnswerByAnswerId(answer_id, new_answer_text, correct) {
    try {
      if (new_answer_text === undefined || correct === undefined) {
        throw new Error("Field 'new_answer_text' or 'correct' is undefined. Cannot edit answer.");
      }
      const result = await this.pool
        .request()
        .query(
          `UPDATE quizzes.dbo.answers SET answer_text = '${new_answer_text}', correct = '${correct}' WHERE answer_id = '${answer_id}'`
        );       
      if (result.rowsAffected[0] === 1) {
        console.log("Answer edited successfully");
        const answer = await this.getAnswerByAnswerId(answer_id);
        return answer;
      }
      
    } catch (error) {
      console.log(error);      
    }
  }

  // Function to delete answer by answer id
  async deleteAnswerByAnswerId(answer_id) {
    try {
      const deleted_answer = await this.getAnswerByAnswerId(answer_id);
      const result = await this.pool
        .request()
        .query(
          `DELETE FROM quizzes.dbo.answers WHERE answer_id = '${answer_id}'`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Answer deleted successfully");
        return deleted_answer;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Database();
