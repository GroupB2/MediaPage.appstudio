let FriendProfileDescription = ""

btnSearchFriendProfile.onclick=function() {
  mediaTitle = inptSearch7Copy.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch7Copy.value = ''
  
  drpRate.value = 'Rate'
  drpRate2.value = 'Rate'
  drpRate3.value = 'Rate'
  
    query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if (results[0] != '' && results.length == 1) {
        drpRate.value = results[0]
        drpRate2.value = results[0]
        drpRate3.value = results[0]
    }
    
    ChangeForm(Search)
}

//Displays user's profile page:
FriendProfile.onshow=function(){
  //To try
 // let currentUser="maireni"


    hmbrMenuFriendProfile.clear()
    hmbrMenuFriendProfile.addItem("Home")
    hmbrMenuFriendProfile.addItem("Profile")
    hmbrMenuFriendProfile.addItem("Friends")
    hmbrMenuFriendProfile.addItem("Watchlist")
    hmbrMenuFriendProfile.addItem("Movie Theaters")
    hmbrMenuFriendProfile.addItem("Log Out")
    
    lblUsername.textContent = userNameFriend
    
    //found profile about

    let query = "SELECT `about` FROM user WHERE `username` = '" + userNameFriend + "'"
    console.log(query)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        let FriendProfileAbout = results[0]
        console.log(FriendProfileAbout)
        
        let found = False
        if (FriendProfileAbout != '' && results.length == 1)
            found = True
        
        if (found == True){
            FriendProfileDescription = FriendProfileAbout
            console.log(profileDescription)
            txtaDescriptionProfileFriend.value = FriendProfileDescription
        } else {
            FriendProfileDescription = "This user was too lazy to add anything"
            txtaDescriptionProfileFriend.value = FriendProfileDescription
        }
    console.log(txtaDescriptionProfileFriend.value)



//found profile picture

    let queryPic = "SELECT `profile_pic` FROM user WHERE `username` = '" + userNameFriend + "'"
    console.log(queryPic)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + queryPic)
        results = JSON.parse(req.responseText)
        let FriendProfilePic = results[0]
        console.log(FriendProfilePic)
        
        let foundPic = False
        if (FriendProfilePic != '' && results.length == 1)
            found = True
        
        if (found == True){
            FriendProfilePicture = FriendProfilePic
            console.log(FriendProfilePicture)
            FriendProfilePicture.src = FriendProfileDescription
        } 
        
    console.log(txtaDescriptionProfileFriend.value)
    // query to found FirstName
    let NameQuery = "SELECT `first_name` FROM user WHERE `username` = '" + userNameFriend + "'"
    console.log(NameQuery)
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + NameQuery)
        resultsName = JSON.parse(req1.responseText)
        let FriendName = resultsName[0]
        console.log(FriendName)
    
        let foundName = False
        if (FriendName != '' && resultsName.length == 1)
            foundName = True
        
        if (foundName == True){
            FriendFirstName = FriendName
            console.log(FriendFirstName)
            LblReviewsFriend.value= (`${FriendFirstName}'s Reviews`)
            lblWatchListFriend.value= (`${FriendFirstName}'s Watchlist`)
            
            //query found last Name
             let LastNameQuery = "SELECT `last_name` FROM user WHERE `username` = '" + userNameFriend + "'"
              console.log(LastNameQuery)
              req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + LastNameQuery)
              resultsLastName = JSON.parse(req2.responseText)
              let FriendLastName = resultsLastName[0]
              console.log(FriendLastName)
  
                let foundLastName = False
                if (FriendLastName != '' && resultsLastName.length == 1)
                    foundLastName = True
                
                if (foundLastName == True){
                    FriendLN = FriendLastName
                    console.log(FriendLN)
                    FriendProfileName= (FriendFirstName + ' '+ FriendLN)
                    lblFriendName.textContent = FriendProfileName
                } else {
                    FriendProfileName = "n/a"
                    lblFriendName.textContent = FriendProfileName
                }
    
        } else {
            FriendProfileName = "n/a"
            lblFriendName.textContent = FriendProfileName
        }
    
    console.log(lblFriendName.textContent )
    
    //The following code grabs the user's id using the username they used when they first logged in with
    let query5 = "SELECT `user_id` FROM user WHERE `username` = '" + currentUser + "'"
    req5 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query5)
        results5 = JSON.parse(req5.responseText)
        CurrentUser_id = results5[0]
        console.log(CurrentUser_id)
    
    //Change Value of button to remove or add friend 
     let queryFriend = "SELECT `friend_id` FROM friend WHERE `username` = '" + userNameFriend + "' and `user_id` = '" + CurrentUser_id + "'"
    console.log(queryFriend)
    req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + queryFriend)
        results4 = JSON.parse(req4.responseText)
        let FriendsFriends = results4.length
        console.log(FriendsFriends)
       
        if (FriendsFriends==0){
        btnAddRemFriend.value = "Add Friend"
      }
      else if (FriendsFriends>0){
        btnAddRemFriend.value = "Remove Friend"
        }

}

//Hamburger function feature:
hmbrMenuFriendProfile.onclick=function(s){ 
    if (typeof(s) == "object")
       return
       
    switch(s) {
        case "Home":
            ChangeForm(home)
            break
        case "Friends":
            ChangeForm(friendsList)
            break
        case "Watchlist":
            ChangeForm(Watchlist)
            break
        case "Movie Theaters":
            ChangeForm(Maps)
            break
        case "Profile":
            ChangeForm(profile)
            break
        case "Log Out":
            ChangeForm(logOut)
            break
        }
}

//Takes user to various forms from the profile page:

btnWatchListFriend.onclick=function(){
  userNameFriend = lblUsername.value
  ChangeForm(FriendWatchlist)
}

btnReviewsFriend.onclick=function(){
  alert("This form is yet to be finished")
}


btnAddRemFriend.onclick=function(){
  //To try
 // let currentUser="maireni"
  ProfileName = lblFriendName.textContent
  //The following code grabs the user's id using the username they used when they first logged in with
          let query = "SELECT `user_id` FROM user WHERE `username` = '" + currentUser + "'"
          req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
              results = JSON.parse(req.responseText)
              CurrentUser_id = results[0]
          
          //The following code grabs the friend's id using the username 
          let query1 = "SELECT `user_id` FROM user WHERE `username` = '" + userNameFriend + "'"
          req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query1)
              results = JSON.parse(req.responseText)
              FriendUser_id = results[0]

    if (btnAddRemFriend.value == "Remove Friend"){
    
    let queryRem = "DELETE FROM friend WHERE `friend_id` = '" + FriendUser_id + "'  and username='" + userNameFriend + "' and user_id='" + CurrentUser_id + "'"
          reqRem = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + queryRem)
          console.log(queryRem)
          if (reqRem.status == 200) { 
              if (reqRem.responseText == 500){
                  lblAddFriend.hidden = False
                  lblAddFriend.textContent = `You have successfully remove ${ProfileName} as a friend`
              } else {
                  lblAddFriend.hidden = False
                  lblAddFriend.textContent = `Oops, there was a problem remoing ${ProfileName} as a friend...`
              }
          } else 
              lblAddFriend.textContent = "Error: " + req.status
          btnAddRemFriend.value = "Add Friend"
  }
  else{
    let query2 = "INSERT INTO friend (`friend_id`,`username`,`user_id`) VALUES ('" + FriendUser_id + "', '" + userNameFriend + "', '" + CurrentUser_id + "')"
          req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query2)
          console.log(query2)
          if (req.status == 200) { 
              if (req.responseText == 500){
                  lblAddFriend.hidden = False
                  lblAddFriend.textContent = "Hooray! You have successfully added a new friend :)"
              } else {
                  lblAddFriend.hidden = False
                  lblAddFriend.textContent = "Oops, there was a problem adding the friend... "
              }
            } else 
              lblAddFriend.textContent = "Error: " + req.status
    }
  btnAddRemFriend.value = "Remove Friend"
}
