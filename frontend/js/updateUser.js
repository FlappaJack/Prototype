let urlParameters = new URLSearchParams(window.location.search)
let userId = urlParameters.get("req.session.user")
//grabs the user by there id
if (userId){
  fetch(`api/users/${userID}`, {
    method: "GET"})
      .then(res => res.json())
      .then(user => {
        console.log(user)

        //push existing user information into the form inputs populating them
        document.getElementById("userID").value = userId
        document.getElementById("firstName").value = user.firstName
        document.getElementById("lastName").value = user.lastName
        document.getElementById("email").value = user.email
        document.getElementById("username").value = user.username
        document.getElementById("password").value = user.password
        document.getElementById("userStatus").value = user.userStatus
      })
}
console.log(user)
//posts any changes to the database
function postUpdateUser(){
  let updateUserForm = document.getElementById("update-user-form")
  let userID = document.getElementById("userID").value
  let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateUserForm)))
  console.log(formDataJSON)
  fetch(`api/users/update/${userID}`, {
    method:"PUT",
    headers:{'Content-Type': 'application/json'},
    body: formDataJSON

  })
  //alerts user of Database response
  .then(res => res.json())
  .then(response => {
    alert(response)

  window.location.href = "/pages.html"
  })
}
//deletes the user from the database
function postDeleteUser(){
  let userID = document.getElementById("userID").value
//grabs user by there id and deletes information from the databse
  fetch(`api/users/delete/${userID}`, {
    method:"POST"
  })
  //responds when an item is deleted from the database
  .then(res => res.json())
  .then(response => {
    console.log("delete request sent!")
    alert(response)
//sends user to user list when item is deleted
  window.location.href = "pages.html"
  })
}
