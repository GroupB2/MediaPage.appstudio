let profileDescription = ""
let profilePicture = ""

btnSearch7.onclick=function() {
  mediaTitle = inptSearch7.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch7.value = ''
  
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
profile.onshow=function(){
    hmbrMenu6.clear()
    hmbrMenu6.addItem("Home")
    hmbrMenu6.addItem("Profile")
    hmbrMenu6.addItem("Friends")
    hmbrMenu6.addItem("Watchlist")
    hmbrMenu6.addItem("Movie Theaters")
    hmbrMenu6.addItem("Twitter")
    hmbrMenu6.addItem("Log Out")
    
    lblUserName.textContent = currentUser
    
    let query = "SELECT `about` FROM user WHERE `username` = '" + currentUser + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        let profileAbout = results[0]
        
        let found = False
        if (profileAbout != '' && results.length == 1)
            found = True
        
        if (found == True){
            profileDescription = profileAbout
            console.log(profileDescription)
            txtaDescriptionProfile.value = profileDescription
        } else {
            profileDescription = "This user was too lazy to add anything"
            txtaDescriptionProfile.value = profileDescription
        }
    
    let originalSourcePic = imgProfilePic.src
    let fiveDigits = ""
    
    for (i = 17; i < 22; i++){
        fiveDigits = fiveDigits + originalSourcePic[i]
    }
    
    
    
    let query2 = "SELECT `profile_pic` FROM user WHERE `username` = '" + currentUser + "'"
    console.log(query2)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query2)
        imageResults = JSON.parse(req.responseText)
        let profilePic = imageResults[0][0]
        let fiveDigits2 = ""
        
        let imageFound = False
        if (profilePic != '' && imageResults.length == 1){
            imageFound = True
        }
        
        console.log(imageFound)
        if (imageFound == True){
            
            for (i = 17; i < 22; i++){
                fiveDigits2 = fiveDigits2 + profilePic[i]
            }

            if (fiveDigits == fiveDigits2){
                profilePicture = profilePic
                imgProfilePic.src = profilePicture
            }
            else{
                for (i = 0; i < 16; i++){
                    profilePicture = profilePicture + profilePic[i]
                }
                profilePicture = profilePicture + fiveDigits
                
                for (i = 22; i < profilePic.length; i++){
                    profilePicture = profilePicture + profilePic[i]
                }
                imgProfilePic.src = profilePicture
            }
        }

}

//Hamburger function feature:
hmbrMenu6.onclick=function(s){ 
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
        case "Twitter":
            ChangeForm(twitter)
            break
        case "Log Out":
            ChangeForm(loginPage)
            query = "SELECT username AND password FROM user WHERE username = ${`username`} AND password = ${`password`}"
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            if (req.status == 200) {
                const userLogout = () => {
                    auth.signOut()
                        .then(function() {
                            lblResult2.value("You have logged out!")
                        })
                        .catch(function(error) {
                            lblError.value = "Error -- could not log out!"
                        });
                }
            }
            break
        }
}

//Takes user to various forms from the profile page:
btnProfileEdit.onclick=function(){
    ChangeForm(editProfile)
}

btnWatchList.onclick=function(){
  ChangeForm(Watchlist)
}

btnReviews.onclick=function(){
  ChangeForm(PastReviews)
}

btnAddFriend.onclick=function(){
  ChangeForm(searchFriend)
}

btnFriends1.onclick=function(){
  ChangeForm(friendsList)
}