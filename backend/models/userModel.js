// Access the database connection from database.js
const db = require("../database");

module.exports.getAllUsers = () => {
    return db.query(
    "SELECT userID, pfpPath, firstname, lastname, email, username, userStatus FROM users"
  );
};

module.exports.createUser = (
  pfpPath,
  firstname,
  lastname,
  email,
  username,
  password,
  userStatus
) => {
  return db.query(
    "INSERT INTO users (pfpPath, firstname, lastname, email, username, password, userStatus)" +
      "VALUES (?,?,?,?,?,?,?)",
    [pfpPath, firstname, lastname, email, username, password, userStatus]
  );
};

module.exports.getUserById = (userId) => {
  return db.query("SELECT * FROM users where userID = ?", [userId])
}
module.exports.getUsersByUsername = (username) => {
  return db.query("select * from users WHERE username = ?", [username])
}
module.exports.updateUser = (userId, pfpPath, firstname, lastname, email, username, password, userStatus) => {
  return db.query("UPDATE users SET firstname = ?, lastname = ?, email = ?, username = ?, password = ?, userStatus = ? WHERE userID = ?", [firstname, lastname, email, username, password, userStatus, userId])
}

module.exports.deleteUser = (userId) =>{
  return db.query("DELETE FROM users WHERE userID = ?", [userId])
}
