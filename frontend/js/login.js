function postLoginUser(){
    //get access to login user form
    let loginUserForm = document.getElementById("login-user-form")

    //grabs form information for the log in user
    let formDataJSON = JSON.stringify(
    Object.fromEntries(new FormData(loginUserForm))

  );
  console.log(formDataJSON);
  // post the form data to the backend
  fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json",
    },
    body: formDataJSON,
  })
  //if loggin fails rejects the user session
    .then((res) => {
      if(res.status === 401) return Promise.reject("login failed")
      return res.json()
    })
  
    .then((res) => {
      alert(res);
      window.location.href = "pages.html";
    })
    //if theres an error catch it and send response
    .catch((error) => {
      console.log(error);
    });
}
