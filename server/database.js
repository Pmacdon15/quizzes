const sql = require("mssql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const database = process.env.MSSQL_DATABASE;

/**
 * Represents a database connection.
 * @class
 * @memberof module:database
 */
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

  /**
   * Connects to the database.
   * @async
   * @function connectToDatabase
   * @memberof module:database
   * @instance
   * @throws {Error} If there is an error connecting to the database.
   */
  async connectToDatabase() {
    try {
      await this.pool.connect();
      console.log("\x1b[33mConnected to the database!!\x1b[0m");
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  }

  /**
   * Authenticates a user by checking their email and password against the database.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of user objects without the password field.
   */
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

  /**
   * Retrieves users from the database based on their email.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of user objects.
   */
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

  /**
   * Registers a new user in the database.
   *
   * @param {string} email - The email of the user.
   * @param {string} first_name - The first name of the user.
   * @param {string} last_name - The last name of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} - A promise that resolves to the registered user object.
   */
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

  /**
   * Registers a user as an admin in the database.
   * @param {string} email - The email of the user.
   * @param {string} first_name - The first name of the user.
   * @param {string} last_name - The last name of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<Object>} - A promise that resolves to the registered user object.
   */
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

  /**
   * Updates the password for a user with the specified email.
   * @param {string} email - The email of the user.
   * @param {string} new_password - The new password to set for the user.
   * @returns {Promise<Object>} - A promise that resolves to the updated user object.
   * @throws {Error} - If the new password is undefined.
   */
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

  /**
   * Deletes a user from the database based on their email.
   * @param {string} email - The email of the user to be deleted.
   * @returns {Promise<Object>} - A promise that resolves to the deleted user object.
   */
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

  /**
   * Retrieves all tests from the database.
   * @returns {Promise<Array>} An array of test objects.
   */
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

  /**
   * Retrieves tests from the database by test name.
   * @param {string} test_name - The name of the test to retrieve.
   * @returns {Promise<Array>} - A promise that resolves to an array of test records.
   */
  async getTestByName(test_name) {
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

  /**
   * Adds a test to the database.
   * @param {string} test_name - The name of the test to be added.
   * @returns {Promise<Array>} - A promise that resolves to an array of tests after the new test has been added.
   * @throws {Error} - If the test_name parameter is undefined.
   */
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
        const test = this.getTestByName(test_name);
        return test;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Edits a test name in the database.
   * @param {string} test_name - The current test name.
   * @param {string} new_test_name - The new test name.
   * @returns {Promise<Object>} - A Promise that resolves to the updated test object.
   * @throws {Error} - If the new test name is undefined.
   */
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
        const test = this.getTestByName(new_test_name);
        return test;
      }
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * Deletes a test from the database by test name.
   * @param {string} test_name - The name of the test to be deleted.
   * @returns {Promise<Object>} - A promise that resolves to the deleted test object.
   * @throws {Error} - If the test name is undefined.
   * @throws {Error} - If the test name is not found in the database.
   */
  async deleteTest(test_name) {
    try {
      if (test_name === undefined) {
        throw new Error("Test name is undefined. Cannot delete test.");
      }
      const test = this.getTestByName(test_name);
      const result = await this.pool
        .request()
        .query(
          `DELETE FROM quizzes.dbo.tests WHERE test_name = '${test_name}'`
        );
      if (result.rowsAffected[0] === 1) {
        console.log("Test deleted successfully");
        return test;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Retrieves questions by test name from the database.
   * @param {string} test_name - The name of the test.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of question objects.
   */
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

  /**
   * Retrieves a question from the database based on the provided question ID.
   * @param {string} question_id - The ID of the question to retrieve.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of question objects.
   */
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

  /**
   * Adds a question to the database by test name.
   * @param {string} test_name - The name of the test.
   * @param {string} question_text - The text of the question.
   * @returns {Promise<Object>} - The added question.
   */
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

  /**
   * Edits a question in the database by its question ID.
   * @param {number} question_id - The ID of the question to be edited.
   * @param {string} question_text - The new text for the question.
   * @returns {Promise<Object>} - A promise that resolves to the edited question object.
   * @throws {Error} - If the question text is undefined.
   */
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

  /**
   * Deletes a question from the database by its question ID.
   * @param {string} question_id - The ID of the question to be deleted.
   * @returns {Promise<Object>} - A promise that resolves to the deleted question.
   */
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

  /**
   * Retrieves all answers from the database.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of answer objects.
   */
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

  /**
   * Retrieves answers by test name.
   * @param {string} test_name - The name of the test.
   * @returns {Promise<Array>} - A promise that resolves to an array of answers.
   */
  async getAnswersByTestName(test_name) {
    try {
      const result = await this.pool
        .request()
        .query(
          `SELECT * FROM quizzes.dbo.answers WHERE question_id IN (SELECT question_id FROM quizzes.dbo.questions WHERE test_id = (SELECT test_id FROM quizzes.dbo.tests WHERE test_name = '${test_name}'))`
        );
      if (result.recordset.length > 0) {
        console.log("Answers retrieved successfully");
        return result.recordset;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Retrieves an answer from the database based on the answer ID.
   * @param {string} answer_id - The ID of the answer to retrieve.
   * @returns {Promise<Array>} - A promise that resolves to an array of answer objects.
   */
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

  /**
   * Adds an answer to the database by question ID.
   * @param {number} question_id - The ID of the question.
   * @param {string} answer_text - The text of the answer.
   * @param {boolean} correct - Indicates whether the answer is correct or not.
   * @returns {Promise<Object>} - The added answer object.
   * @throws {Error} - If answer_text or correct is undefined.
   */
  async addAnswerByQuestionId(question_id, answer_text, correct) {
    try {
      if (answer_text === undefined || correct === undefined) {
        throw new Error(
          "Field Answer_text or correct is undefined. Cannot add answer."
        );
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

  /**
   * Edits an answer in the database by its answer ID.
   * @param {number} answer_id - The ID of the answer to be edited.
   * @param {string} new_answer_text - The new text for the answer.
   * @param {boolean} correct - Indicates whether the answer is correct or not.
   * @returns {Promise<Object>} - A promise that resolves to the edited answer object.
   * @throws {Error} - If 'new_answer_text' or 'correct' is undefined.
   */
  async editAnswerByAnswerId(answer_id, new_answer_text, correct) {
    try {
      if (new_answer_text === undefined || correct === undefined) {
        throw new Error(
          "Field 'new_answer_text' or 'correct' is undefined. Cannot edit answer."
        );
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

  /**
   * Deletes an answer from the database by its answer ID.
   * @param {number} answer_id - The ID of the answer to be deleted.
   * @returns {Promise<Object>} - The deleted answer object.
   */
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

module.exports = Database;
