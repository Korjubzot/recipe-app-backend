const { Pool } = require("pg");

// Retrieve environment variables
const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

// Create a new pool instance with environment variables
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
});

// SQL query to create the "recipes" table
const createRecipesTableQuery = `
  CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    cuisine TEXT
  );
`;

// Connect to the database and create the table
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  // Execute the query to create the "recipes" table
  client.query(createRecipesTableQuery, (err) => {
    done(); // Release the client back to the pool

    if (err) {
      console.error("Error creating 'recipes' table:", err);
    } else {
      console.log("Table 'recipes' created successfully.");
    }

    // Start your Express server here or in a callback, once the table is created
  });
});
