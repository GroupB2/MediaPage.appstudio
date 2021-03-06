lblFriendsList.hidden = True

btnSearch9.onclick=function() {
  mediaTitle = inptSearch9.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch9.value = ''
  
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


friendsList.onshow=function(){
    listGroupFriends.clear()
    
    hmbrMenu5.clear()
    hmbrMenu5.addItem("Home")
    hmbrMenu5.addItem("Profile")
    hmbrMenu5.addItem("Friends")
    hmbrMenu5.addItem("Watchlist")
    hmbrMenu5.addItem("Movie Theaters")
    hmbrMenu5.addItem("Twitter")
    hmbrMenu5.addItem("Log Out")

    //The following code grabs the user's id using the username they used when they first logged in with:
    query = "SELECT `user_id` FROM user WHERE `username` = '" + currentUser + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        user_id = results[0]
    //lblFriendsList.textContent = `You are user '${profileIdentifier}' with the user id of '${user_id}'.`
    
    
    let query2 = "SELECT `username` FROM friend WHERE `user_id` = '" + user_id + "'"
    console.log(query2)
    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query2)
    
    if (req.status == 200) {       
        results = JSON.parse(req.responseText)
        if (results.length == 0){
            lblFriendsList.hidden = False
            lblFriendsList.textContent = "Looks like you don't have any friends at the moment."
        } else { 
            for (i = 0; i < results.length; i++)
                listGroupFriends.addItem(results[i][0])
                
        }
    }
}

//Hamburger function feature:
hmbrMenu5.onclick=function(s){ 
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

btnFriends2.onclick=function(){
  ChangeForm(searchFriend)
}

listGroupFriends.onclick=function(t){
    if (typeof(t) === "object"){
        return
        console.log(NSB.$("listGroupFriends_" + t).textContent)
    }
    else{
        randomVariable = NSB.$("listGroupFriends_" + t).textContent
        userNameFriend = randomVariable.trim()
        console.log(NSB.$("listGroupFriends_" + t).textContent)
        console.log(userNameFriend.length)
        ChangeForm(FriendProfile)
    }

}
