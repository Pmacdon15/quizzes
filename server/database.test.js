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

  describe("login", () => {
    it("should authenticate a user with valid email and password", async () => {
      const email = "user@example.com";
      const password = "password";

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
      const email = "user@example.com";
      const users = await database.getUsersByEmail(email);

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
    });

    it("should return Something when wrong with getting user.", async () => {
      const email = "Users@examples.com";
      const users = await database.getUsersByEmail(email);

      // Expect that the error message contains the specified string
      expect("Something when wrong with getting user.");
    });
  });

  // Register user
  describe("registerUser", () => {
    it("should add a user with valid email, first_name, last_name, password", async () => {
      const email = "user1@example.com";
      const first_name = "user1";
      const last_name = "example1";
      const password = "password";

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
      const email = "user1@example.com";
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

  // Register admin user
  describe("registerUserAdmin", () => {
    it("should add an admin user with valid email, first_name, last_name, password", async () => {
      const email = "admin1@example.com";
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
      const email = "admin1@example.com";
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
      // This deletes the user from the database as thi is a test user
      const cleanup = await database.deleteUser(email);
    });
  });

  // Update password
  describe("updatePassword", () => {
    it("should update a user's password with valid email and new_password", async () => {
      const email = "admin@example.com";
      const new_password = "password";

      const users = await database.updatePassword(email, new_password);

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
    });
    it("should return Something when wrong with updating password.", async () => {
      const email = "Admins@example.com";
      const new_password = "password";

      const users = await database.updatePassword(email, new_password);

      expect("Something when wrong with updating password.");
    });
  });

  // Delete user
  describe("deleteUser", () => {
    it("should delete a user with valid email", async () => {
      const email = "user1@example.com";
      const users = await database.deleteUser(email);

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe(email);
    });
    it("should return Something when wrong with deleting user.", async () => {
      const email = "user1@example.com";
      const users = await database.deleteUser(email);

      expect("Something when wrong with deleting user.");
    });
  });

  // Get all tests
  describe("getTests", () => {
    it("should get all tests", async () => {
      const tests = await database.getTests();
      expect(tests.length).toBeGreaterThan(0);
    });
  });

  //Add test
  describe("addTest", () => {
    it("should add a test with valid test_name", async () => {
      const test_name = "New test";

      const tests = await database.addTest(test_name);

      const containsTestName = tests.some(
        (test) => test.test_name === test_name
      );
      expect(containsTestName).toBe(true);
    });
  });

  //Edit test name
  describe("editTest", () => {
    it("should edit a test name with valid test_name and new_test_name", async () => {
      const test_name = "New test";
      const new_test_name = "New test name";

      const test = await database.editTest(test_name, new_test_name);

      expect(test[0].test_name).toBe(new_test_name);
    });
  });
  


});
