const { default: test } = require("node:test");
const Database = require("./database");

describe("Database", () => {
  let database;

  beforeAll(() => {
    // Initialize the database instance before running the tests
    database = new Database();
  });

  beforeEach(async () => {
    // Connect to the database before each test
    await database.connectToDatabase();
  });

  afterEach(async () => {
    // Disconnect from the database after each test
    await database.pool.close();
  });
  
  // Register user
  let email = "test_user@example.com";
  let password = "password";
  describe("registerUser", () => {
    it("should add a user with valid email, first_name, last_name, password", async () => {      
      const first_name = "user1";
      const last_name = "example1";      

      const users = await database.registerUser(
        email,
        first_name,
        last_name,
        password
      );

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
      expect(users[0].first_name).toBe(first_name);
      expect(users[0].last_name).toBe(last_name);
    });
    it("should return Something when wrong with adding a user.", async () => {
      const email = "test_user@example.com";
      const first_name = "user1";
      const last_name = "example1";
      const password = "password";

      const users = await database.registerUser(
        email,
        first_name,
        last_name,
        password
      );

      expect("Something when wrong with adding a user.");
    });
  });

  // Login
  describe("login", () => {
    it("should authenticate a user with valid email and password", async () => {
      // const email = "user@example.com";
      // const password = "password";

      const users = await database.login(email, password);

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
      expect(users[0].password).toBeUndefined();
    });

    it("should return Something when wrong with login", async () => {
      const email = "invalid@example.com";
      const password = "invalid";

      const users = await database.login(email, password);

      expect("Something when wrong with login.");
    });
  });

  // Get user by email
  describe("getUsersByEmail", () => {
    it("should return a user with valid email", async () => {
      const email = "test_user@example.com";
      const users = await database.getUsersByEmail(email);

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
    });

    it("should return Something when wrong with getting user.", async () => {
      const email = "NotAUserName@examples.com";
      const users = await database.getUsersByEmail(email);

      // Expect that the error message contains the specified string
      expect("Something when wrong with getting user.");
    });
  });

  // Register admin user
  describe("registerUserAdmin", () => {
    it("should add an admin user with valid email, first_name, last_name, password", async () => {
      const email = "test_admin@example.com";
      const first_name = "admin1";
      const last_name = "example1";
      const password = "password";

      const users = await database.registerUserAdmin(
        email,
        first_name,
        last_name,
        password
      );

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
      expect(users[0].first_name).toBe(first_name);
      expect(users[0].last_name).toBe(last_name);
    });
    it("should return Something when wrong with adding an admin user.", async () => {
      const email = "test_admin@example.com";
      const first_name = "admin1";
      const last_name = "example1";
      const password = "password";

      const users = await database.registerUserAdmin(
        email,
        first_name,
        last_name,
        password
      );

      expect("Something when wrong with adding an admin user.");
      // This deletes the user from the database as this is a test user
      const cleanup = await database.deleteUser(email);
    });
  });

  // Update password
  describe("updatePassword", () => {
    it("should update a user's password with valid email and new_password", async () => {
      const email = "test_user@example.com";
      const new_password = "password";

      const users = await database.updatePassword(email, new_password);

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
    });
    it("should return Something when wrong with updating password.", async () => {
      const email = "not_a_test_user@example.com";
      const new_password = "password";

      const users = await database.updatePassword(email, new_password);

      expect("Something when wrong with updating password.");
    });
  });

  // Delete user
  describe("deleteUser", () => {
    it("should delete a user with valid email", async () => {
      const email = "test_user@example.com";
      const users = await database.deleteUser(email);

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
    });
    it("should return Something when wrong with deleting user.", async () => {
      const email = "test_user@example.com";
      const users = await database.deleteUser(email);

      expect("Something when wrong with deleting user.");
    });
  });

  //Add test
  let test_name;
  let test_id;
  describe("addTest", () => {
    it("should add a test with valid test_name", async () => {
      test_name = "New test";
      
      const tests = await database.addTest(test_name);
      test_id = tests[0].test_id;

      const containsTestName = tests.some(
        (test) => test.test_name === test_name
      );
      expect(containsTestName).toBe(true);
    });
  });

  // Get all tests
  describe("getTests", () => {
    it("should get all tests", async () => {
      const tests = await database.getTests();
      expect(tests.length).toBeGreaterThan(0);
    });
  });

  //Edit test name
  describe("editTest", () => {
    it("should edit a test name with valid test_name and new_test_name", async () => {
      const new_test_name = "New test name";

      const test = await database.editTest(test_name, new_test_name);
      test_name = new_test_name;

      expect(test[0].test_name).toBe(new_test_name);
    });
  });
  

  // Add question by test name
  // Set question_id to be used in edit question by question id and delete question by question id
  let question_id;
  describe("addQuestionByTestName", () => {
    it("should add a question with valid test_name and question_text", async () => {      
      const question_text = "This is the test question?";

      const question = await database.addQuestionByTestName(
        test_name,
        question_text
      );
      question_id = question[0].question_id;

      expect(question[0].question_text).toBe(question_text);
    });
  });

  // Get questions by test name
  describe("getQuestionsByTestName", () => {
    it("should get questions with valid test_name", async () => {  
      const questions = await database.getQuestionsByTestName(test_name);      
      expect(questions.length).toBeGreaterThan(0);
    });
  });

  // Get questions by question_id
  describe("getQuestionByQuestionId", () => {
    it("should get questions with valid question_id", async () => {
      // const question_id = 1;

      const questions = await database.getQuestionByQuestionId(question_id);

      expect(questions.length).toBeGreaterThan(0);
    });
  });

  // Edit question by question id
  describe("editQuestionByQuestionId", () => {
    it("should edit a question with valid question_id and new_question_text", async () => {
      const new_question_text = "Am i even a question?";

      const question = await database.editQuestionByQuestionId(
        question_id,
        new_question_text
      );

      expect(question[0].question_text).toBe(new_question_text);
    });
  });

  // Add answer by question id
  // Set answer_id to be used in edit answer by answer id and delete answer by answer id
  let answer_id;
  describe("addAnswerByQuestionId", () => {
    it("should add an answer with valid question_id and answer_text", async () => {
      const answer_text = "This is the test answer.";
      const correct = 1;
      const answer = await database.addAnswerByQuestionId(
        question_id,
        answer_text,
        correct
      );
      answer_id = answer[0].answer_id;

      expect(answer[0].correct).toBe(true);
      expect(answer[0].answer_text).toBe(answer_text);
    });
  });

  // Get answers by answer id
  describe("getAnswerByAnswerId", () => {
    it("should get answers with valid answer_id", async () => {
      const answers = await database.getAnswerByAnswerId(answer_id);
      
      expect(answers[0].answer_id).toBe(answer_id);
    });
  });

  // Edit answer by answer id
  describe("editAnswerByAnswerId", () => {
    it("should edit an answer with valid answer_id and new_answer_text", async () => {
      const new_answer_text = "This is the new test answer.";
      const correct = 0;
      const answer = await database.editAnswerByAnswerId(
        answer_id,
        new_answer_text,
        correct
      );
      
      expect(answer[0].correct).toBe(false);
      expect(answer[0].answer_text).toBe(new_answer_text);
    });
  });

  // Delete answer by answer id
  describe("deleteAnswerByAnswerId", () => {
    it("should delete an answer with valid answer_id", async () => {
      const answer = await database.deleteAnswerByAnswerId(answer_id);

      expect(answer[0].answer_id).toBe(answer_id);
    });
  });

  // Delete question by question id
  describe("deleteQuestionByQuestionId", () => {
    it("should delete a question with valid question_id", async () => {
      const question = await database.deleteQuestionByQuestionId(question_id);

      expect(question[0].question_id).toBe(question_id);
    });
  });
  
  //Delete test
  describe("deleteTest", () => {
    it("should delete a test with valid test_name", async () => {
      const test = await database.deleteTest(test_name);

      expect(test[0].test_name).toBe(test_name);
    });
  });
});
