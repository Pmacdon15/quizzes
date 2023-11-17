const sql = require('mssql');

// Connection configuration
const config = {
  user: 'pmacd',
  password: 'asdfghjkl3388',
  server: 'WORKSTATION', // You can use 'localhost' if SQL Server is on your local machine
  database: 'quizzes',
  options: {
     encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true,
  },
};

// Connect to the database
sql.connect(config)
  .then((pool) => {
    console.log('Connected to the database');

    // Execute a simple query
    //return pool.request().query('SELECT 1 as Result');

    return pool.request().query('SELECT * FROM quizzes.dbo.Answers');
  })
  .then((result) => {
    console.dir(result);
    //console.log('Query Result:', result.recordset[0].Result);
  })
  .catch((err) => {
    console.error('Error:', err);
  })
  .finally(() => {
    // Close the connection pool
    sql.close();
  });
