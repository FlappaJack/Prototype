//call user API and its relevant information


fetch("/api/users")
  .then(res => res.json())
  .then(users => {
//grab form ID
    let userList = document.getElementById("prof")
//test to see if user information is being grabbed
    console.log(users)

//if unauthorised user then redirect to book list
      //list user detail

      for (let user of users) {

      userList.innerHTML +=`
          <div class="profiles overflow-auto">
            <img class="pfpPath" src='data:image/png;base64, ${user.pfpPath}' />
          <h1>${user.username}</h1>
          <h2>${user.userStatus}</h2>
          <h3>${user.firstname}</h3>
          <h3>${user.lastname}</h3>
          
        </div>
      `
    }


  })
  //catch any errors if there is no session reject user to the login page
  .catch(err => {
    //alert("access denied, not logged in!", err)
    //window.location.href = "/"

    console.log(err)
  })
