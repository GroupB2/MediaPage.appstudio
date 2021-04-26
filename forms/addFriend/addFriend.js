lblMessage2.hidden = True

btnSearch8.onclick=function() {
  mediaTitle = inptSearch8.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch8.value = ''
  
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


addFriend.onshow=function(){
    hmbrMenu7.clear()
    hmbrMenu7.addItem("Home")
    hmbrMenu7.addItem("Profile")
    hmbrMenu7.addItem("Friends")
    hmbrMenu7.addItem("Watchlist")
    hmbrMenu7.addItem("Movie Theaters")
    hmbrMenu7.addItem("Log Out")
}

//Hamburger function feature:
hmbrMenu7.onclick=function(s){ 
    if (typeof(s) == "object")
       return
       
    switch(s) {
        case "Home":
            //ChangeForm(homePage)
            break
        case "Friends":
            ChangeForm(friendsList)
            break
        case "Watchlist":
            //ChangeForm(watchList)
            break
        case "Movie Theaters":
            //ChangeForm(movieTheaters)
            break
        case "Profile":
            ChangeForm(profile)
            break
        case "Log Out":
            ChangeForm(logOut)
            break
        }
}


btnSearchFriend.onclick=function(){
    let userNameFriend = inptFriendSearch.value
    
    //The following code grabs the user's id using the username they used when they first logged in with
    let query = "SELECT `user_id` FROM user WHERE `username` = '" + currentUser + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        user_id = results[0]
    
    let query2 = "INSERT INTO friend (`friend_id`,`username`,`user_id`) VALUES ('" + user_id + "', '" + userNameFriend + "', '" + user_id + "')"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query2)
    if (req.status == 200) { 
        if (req.responseText == 500){
            lblMessage2.hidden = False
            lblMessage2.textContent = "Hooray! You have successfully added a new friend :)"
        } else {
            lblMessage2.hidden = False
            lblMessage2.textContent = "Oops, there was a problem adding the friend... make sure you spelled their username correctly!"
        }
    } else 
        lblMessage2.textContent = "Error: " + req.status
}

btnCancelSearch.onclick=function(){
  inptFriendSearch.value.clear()
  //ChangeForm(profile)
}