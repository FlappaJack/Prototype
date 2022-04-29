const express = require("express");
const session = require("express-session")
const server = express();
const port = 8080;
//conects to front end
server.use(express.static("frontend"));
//conects to back end
server.use("/api", express.static("backend"));

// enable middleware for JSON
// server.use(express.json({
//   limit: '200mb'
// }));
// server.use(express.urlencoded({
//   extended: true
// }));

//enable session
// enable middleware for JSON
server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));

// enable middleware so the we have state
server.use(
  session({
    secret: "secret phrase abc123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    },
  })
);
server.use((req, res, next) => {
  //the user is logged in if they have session database
  let userloggedIn = req.session.user != null
  //define a list of allowed urls for non logged in Users
  // let allowedURLs = [
  //   "/login.html",
  //   "/register.html",
  //   "/registerUser.js",
  //   "/js/login.js",
  //   "/css/style.css",
  //   "/api/users/login",
  //   "/pages.html",
  //   "/js/userprofile.js"
  // ]
  //what URLs and APIs admins have access too
  // let adminURLS = [
  //   "/js/create_user.js",
  //   "/create_user.html",
  //   "/js/update.js",
  //   "/update_user.html",
  //   "/api/users/create",
  //   "/api/users/delete",
  //   "/api/users/update",
  //   "/api/users/:id",
  //   "/api/users",
  //   "/list_users.html"
  // ]
  console.log(req.originalUrl)

  // if the user is logged in
  // allow the request through
//admin privligase
//   if (userloggedIn) {
//     if (adminURLS.includes(req.originalUrl) && req.session.user.accessRights != "admin"){
// //alerts when someone exits and which exit occurs
//     console.log("1 exit")
//     res.status(401).json("Access denied, Unauthorised user")
//     //res.redirect("/book_list.html")
//   } else {
//     next()
//     console.log("2 exit")
//   }
// }
  // check to see if the URL is allowed for user
  next()
});

//link up controller
const userControler = require("./backend/controlers/userControler.js");
server.use("/api", userControler);
//listens to the local host
server.listen(port, () => {
  console.log("Server listening on http://localhost:" + port);
});
