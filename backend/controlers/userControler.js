const express = require("express");
//npm bcrypt
const bcrypt = require("bcrypt")
const validator = require("validator")
//creates a router so we can define a API
const router = express.Router();

//Access the books model so that we can access the book DATA in this file
const userModel = require("../models/userModel");

// Define the path /api/books endpoint so we can access specific data in that file
router.get("/users", (req, res) => {
  // res.status(200).json(bookModel.getAllBooks());
  userModel
    .getAllUsers()
    .then((results) => {

      let finalRes = []

      for (var variable in results) {
        let pfpPath = results[variable]
        if (pfpPath['pfpPath'] != null) {
        results[variable]['pfpPath'] = Buffer.from(pfpPath['pfpPath'])
        //console.log(pfpPath['pfpPath'] = Buffer.from(pfpPath['pfpPath']).toString());
        }
      }
      //console.log(finalRes)
      console.log(results)
      res.status(200).json(results);

    })
    .catch((error) => {
      // log any errors in the node console
      console.log(error);
      res.status(500).json("query error");
    });
});

//create users and add them into the database
router.post("/users/create", (req, res) => {
  // req.body represents the form filed data
  let user = req.body;
  console.log(user)
//hash the password before inserting into the db
let hashedPassword = bcrypt.hashSync(user.password, 6)

  // each of the following names reference the name
  // attributes in the inputs of the form
  userModel.createUser(
      user.pfpPath,
      validator.escape(user.firstName),
      validator.escape(user.lastName),
      validator.escape(user.email),
      validator.escape(user.username),
      hashedPassword, //we now store the hashed password
      validator.escape(user.userStatus)

    )
    //create a user and give them an ID
    .then((result) => {
      res.status(200).json("user created with id" + result.insertId);
    })//alerts when a error occures and fails to create a user
    .catch((error) => {
      console.log(error)
      res.status(500).json("query error - failed to create user");
    });
});
// !!! this returns an error message if we fail to get a user by there id.
router.get("/users/:id", (req, res) => {
  userModel.getUserById(req.params.id)
    .then((results) => {
      if ( results.length > 0){
        res.status(200).json(results[0])
      } else {
        res.status(404).json ("failed to get user by id")
      }
    })
    //catch errors and ensure that a response is sent
    .catch((error) =>{
      console.log(error)
      res.status(500).json("failed to get user - query error")
    })
})
//define an api/userupdate endpoint that updates an existing users
router.post("/users/update", (req, res) => {
  // the req.body represents the posted json data
  let user = req.session.user
  // each of the names below reference the "name" attribute in the form
  //if password does not start with $
  let hashedPassword = bcrypt.hashSync(user.password, 6);
  if (!user.password.startsWith("$2b$")) {
    hashedPassword = bcrypt.hashSync(user.password, 6)
  }
  console.log(typeof user.userId)
  console.log('current useronline'+ user)
//populate the user feilds and ensure that they are sanitised
  userModel.updateUser(
    user.userId,
    user.pfpPath,
    validator.escape(user.firstName),
    validator.escape(user.lastName),
    validator.escape(user.email),
    validator.escape(user.username),
    hashedPassword, //use the hashed password
    validator.escape(session.user.userStatus)
  )
  //send a response of if the query was successful or failed
  .then((result) =>{
    if (result.affectedRows > 0){
      res.status(200).json("user updated")
    } else{
      res.status(404).json("user not found")
    }
  })
  //checks to see if it can find the user
  .catch((error) =>{
    console.log(error)
    res.status(500).json("user not found")
  })
})
//run a delete user from the database by the users ID
router.post("/users/delete/:id",(req,res) => {
  let userId = req.params.id
console.log(userId)
//call onto the user model then run the delete user query
  userModel.deleteUser(userId)
  .then((results) => {
    if(results.affectedRows > 0){
      res.status(200).json("user deleted")
    } else {
      res.status(404).json ("user not found")
    }
  })
  //alerts to when a person fails to create a user
  .catch((error) => {
    console.log(error)
    res.status(500).json("failed to delete user - query error")
  })
})
//user loggin
router.post("/users/login", (req, res) => {
  // get the login information
  let login = req.body;
  //  find a user with a matching username
  userModel.getUsersByUsername(login.username)
    .then((results) => {
      // did we find auser with a matching username?
      if (results.length > 0) {
        // get the first found user
        let user = results[0];

        // verify the users password

        // bcrypt.compareSync(login.password, user.password)
        if (bcrypt.compareSync(login.password, user.password)) {
          // The user is now authenticated
          console.log(user)
          // set up the session
          req.session.user = {
            userId: user.userID,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            userStatus: user.userStatus,
            email: user.email
          };
          console.log(req.session.user)
          // let the client know the login was successful
          res.status(200).json("login successful");
        } else {
          // This else case runs if the password did NOT match
          res.status(401).json("login failed");
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json("failed to sign in - query error");
    });
  //  we need to check if the found users password matches the login password
  //  we need to set up the session for that now logged in user
});

router.post("/user/logout", (req, res) => {
  // DESTROY THE SESSION
  req.session.destroy();
  res.status(200).json("logged out");
});
//Allows server.js to import the routes defined in this file
module.exports = router;
