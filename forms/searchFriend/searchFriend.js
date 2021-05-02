//global variables:

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


searchFriend.onshow=function(){
    searchFriend.reset()
    lblFriendResult.value = ""
    imageFriendSearchPic.hidden = True
    lblFriendUserSearch.hidden = True
    txtaDescriptionFriendSearch.hidden = True
    btnADDFriend.hidden = True
    
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
    
    query = "SELECT `username` FROM user WHERE `username` = '" + userNameFriend + "'"
    console.log(query)
    
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    
    if (req.status == 200) {       
        results = JSON.parse(req.responseText)
        if (results.length == 0){
            lblFriendResult.value = "Oops, looks like there's no one with that username... make sure you spelled it correctly!"
        } else {
            lblFriendResult.value = `Click on ${userNameFriend}'s username to view their full profile!`
            imageFriendSearchPic.hidden = False
            lblFriendUserSearch.hidden = False
            txtaDescriptionFriendSearch.hidden = False
            btnADDFriend.hidden = False
            
            query2 = "SELECT `username`, `about`, `profile_pic` FROM user WHERE `username` = '" + userNameFriend + "'"
            console.log(query2)
            
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query2)
            if (req.status == 200){ 
                let friendInfo = JSON.parse(req.responseText)
                console.log(friendInfo)
                
            for (i = 0; i < friendInfo.length; i++) {
                lblFriendUserSearch.value = friendInfo[i][0]
                txtaDescriptionFriendSearch.value = friendInfo[i][1]
                imageFriendSearchPic.src = friendInfo[i][2]
            }
            }
        }
    }
}

btnCancelSearch.onclick=function(){
    searchFriend.reset()
    lblFriendResult.value = ""
    imageFriendSearchPic.hidden = True
    lblFriendUserSearch.hidden = True
    txtaDescriptionFriendSearch.hidden = True
    btnADDFriend.hidden = True
}

lblFriendUserSearch.onclick=function(){
  ChangeForm(FriendProfile)
}

btnADDFriend.onclick=function(){
    let userNameFriend = inptFriendSearch.value
    
    //The following code grabs the user's id using the username they used when they first logged in with
    let query3 = "SELECT `user_id` FROM user WHERE `username` = '" + currentUser + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query3)
        userResults = JSON.parse(req.responseText)
        user_id = userResults[0]

    //The following code grabs the friend's user_id with the name entered in the inpt search bar:
    let query4 = "SELECT `user_id` FROM user WHERE `username` = '" + userNameFriend + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query4)
        friendResults = JSON.parse(req.responseText)
        friend_id = friendResults[0]

    //The following code check's to see if the users are already friend with each other:
    let query5 = "SELECT `friend_id` FROM friend WHERE `user_id` = '" + user_id + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query5)
        friendMatchResults = JSON.parse(req.responseText)
        
        let found = False
        for (i = 0; i < friendMatchResults.length; i++){
            if (friend_id == friendMatchResults[i][0]){
                found = True
                break;
            } else
                found = False
        }
        console.log(found)
        if (found == True)
            alert("Looks like your already friends with this user! Try searching a different one...")
        else {
            //The following code inserts a new friend into the friend table using the friend's id, the user's username, and the user's id:
            let query6 = "INSERT INTO friend (`friend_id`,`username`,`user_id`) VALUES ('" + friend_id + "', '" + userNameFriend + "', '" + user_id + "')"
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query6)
            if (req.status == 200) 
                lblFriendResult.value = `Hooray! You have successfully added ${userNameFriend} as a new friend :)`
        }
}

inptFriendSearch.onchange=function(){
    lblFriendResult.value = ""
    imageFriendSearchPic.hidden = True
    lblFriendUserSearch.hidden = True
    txtaDescriptionFriendSearch.hidden = True
    btnADDFriend.hidden = True
}
