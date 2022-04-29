//grabing a base64 string from an image
let base64String = "";
//allows user to upload an image
function imageUploaded() {
//defines the file type that can be uploaded
    var file = document.querySelector(
        'input[type=file]')['files'][0];

    var reader = new FileReader();
    console.log("next");
//loads image when page is loaded
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

          imageBase64Stringsep = base64String;

        // alert(imageBase64Stringsep);
        console.log(base64String);
        return base64String
    }
    reader.readAsDataURL(file);
}



function postCreateUser(e){

  e.preventDefault()
  //get access to the create user form
let createUserForm = document.getElementById("create-user-form")
let formData = new FormData(createUserForm);
formData.append('pfpPath', base64String);
let formDataJSON = JSON.stringify(Object.fromEntries(formData))
//let data = {image:base64String, form:formDataJSON}
console.log(formDataJSON)

//call on the user api and post it
fetch("http://localhost:8080/api/users/create",{
  method: "POST",
  headers: {
    'Content-Type': "application/json"
  },
  body: formDataJSON
})
//redirects user to book list if unauthorised
.then((res) => {
  console.log(res)
  if(res.status === 401){
    alert("Access denined, Unauthorised user")
    //window.location.href = "/index.html"

  }
  //return a response
  return res.json()
  //alerts user when they create a user and pushes them to list users
})
.then(res => {
  console.log("Registered user!"+ res)
  alert("User made")
  window.location.href = "../index.html"
})
//if the create user fails then send an error message
.catch(err => {
  console.log("create user request failed! " + err)
  alert("could not create user")
  //window.location.href = "../index.html"
})

}
