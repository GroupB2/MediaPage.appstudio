let req = ""
let query = ""
let results = ""
let pw = "secreta" // put your database password here
let netID = "amr66568"
let emailData = []
let userNameData = []

userAdd.onshow = function() {
  // get all the email data from the database when program loads
  query = "SELECT email FROM user"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)

  if (req.status == 200) { //transit worked.
    emailData = JSON.parse(req.responseText) // parse data in an array
    console.log(emailData)
  } else {
    // transit error
    console.log("Error")
  }

  // get all the usernames data from the database when program loads
  query = "SELECT username FROM user"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)

  if (req.status == 200) { //transit worked.
    userNameData = JSON.parse(req.responseText) // parse data in an array
    console.log(userNameData)
  } else {
    // transit error
    console.log("Error")
  }
}



btnSubmitAdd.onclick = function() {
  let FirstName = inptFirstName.value
  let LastName = inptLastName.value
  let userName = inptUserName.value
  let email = inptEmail.value
  let password = inptPassword.value
  let repeatPass = inptPasswordRepeat.value
  let foundEmail = false
  let foundUser = false

  if (!FirstName || !LastName || !email || !password || !repeatPass) {
    lblAlertSign.value = "Fill out all columns"
  } else {
    for (i = 0; i < emailData.length; i++) {
      if (email == emailData[i][0]) {
        foundEmail = true
        lblAlertSign.value = "There is a user with this email already"
        break // if foundEmail the item in the database jump out of loop
      } 
    }
      if (foundEmail == false) {
        console.log('No user with this email') 
        //Do same thing with user now
        for (i = 0; i < userNameData.length; i++) {
        if (userName == userNameData[i][0]) {
        foundUser = true
        lblAlertSign.value = "There is a user with this username already"
        break // if foundEmail the item in the database jump out of loop
        } 
      }
        if (foundUser == false) {
        console.log('No user with this email') 
          if (password != repeatPass)
            lblAlertSign.value = "The two passwords don't match"
          if (password == repeatPass) {
            query = "INSERT INTO user (username, first_name, last_name, email, password) VALUES ('" + userName + "','" + FirstName + "',  '" + LastName + "', '" + email + "', '" + password + "')"


            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            if (req.status == 200) {
              if (req.responseText == 500)
                lblAlertSign.value = "You have successfully sign up!"
            } else
              lblAlertSign.value = "There was a problem with adding the user to the database."
          } else
            lblAlertSign.value = "Error: " + req.status
        }
      }
    }
    }
