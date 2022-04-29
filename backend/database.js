// Import my sql module so that we can talk to the database
const mysql = require("mysql2");

// create a connection to the database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "node-bountyboard",
});

// This wrapper will allow the use of promise funtcions
// like .then() and .catch() so that we can use it in an async
// way along with express.JS

// Arrow function - most difficult function that we will use for this project
query = (sql, parameters) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// export the new query function so the models can use it
module.exports = { query };
