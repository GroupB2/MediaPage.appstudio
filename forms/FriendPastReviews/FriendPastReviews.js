btnSearch21.onclick=function() {
  mediaTitle = inptSearch21.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch21.value = ''
  
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

FriendPastReviews.onshow=function(){
    lblPastReviews2.value = `${userNameFriend.trim()}'s Past Reviews`
    hmbrMenu21.clear()    // clear out choices before adding ones you want
    hmbrMenu21.addItem("Home")
    hmbrMenu21.addItem("Profile")
    hmbrMenu21.addItem("Friends")
    hmbrMenu21.addItem("Watchlist")
    hmbrMenu21.addItem("Movie Theaters")
    hmbrMenu21.addItem("Twitter")
    hmbrMenu21.addItem("Log Out")
    txtaPastReview2.hidden = True
    btnGoToReview2.hidden = True
    btnSubmit4.value = 'Search'
    selReviews2.clear()
    selReviews2.hidden = False
    let item = ''
    query = `SELECT title, rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${userNameFriend}' AND mr.review IS NOT NULL ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Rating: ' + results[i][1]
        selReviews2.addItem(item)
    }
}

hmbrMenu21.onclick=function(s) {
    if (typeof(s) == "object") {
       return
    }
    switch(s) {
        case "Home":
            ChangeForm(home)
            break
        case "Profile":
            ChangeForm(profile)
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

btnReset4.onclick=function(){
    selReviews2.clear()
    selReviews2.hidden = False
    txtaPastReview2.hidden = True
    let item = ''
    query = `SELECT title, rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${userNameFriend}' AND mr.review IS NOT NULL ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Rating: ' + results[i][1]
        selReviews2.addItem(item)
    }
    btnGoToReview2.hidden = True
}

selReviews2.onclick=function(){
   btnSubmit5.value = 'Submit'
}

btnSubmit5.onclick=function(){
  if (btnSubmit5.value == 'Search')
    btnGoToReview2.hidden = True
  if (inptPastReview2.value != '') {
    txtaPastReview2.hidden = True
    selReviews2.hidden = False
    selReviews2.clear()
    let un = inptPastReview2.value
    query = `SELECT title, rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${userNameFriend}' AND mr.review IS NOT NULL ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Rating: ' + results[i][1]
        selReviews2.addItem(item)
    }
    inptPastReview2.value = ''
    btnSubmit5.value = 'Submit'
  }
else {
    btnSubmit5.value = 'Search'
    let placeholder = selReviews2.text
    let placeholder2 = placeholder[0] + placeholder[0]
    let mediaReview = ''
    let newMediaReview = ''
    let selectedReview = ''
    if (placeholder != -1) {
        for (i = 0; placeholder2 != ' |'; i ++) {
            mediaReview = mediaReview + placeholder[i]
            placeholder2 = placeholder[i] + placeholder[i +1]
        }
        for (i = 0; i < mediaReview.length - 1; i++) {
            newMediaReview = newMediaReview + mediaReview[i]
        }
        query = `SELECT review FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaReview}' AND u.username = '${userNameFriend}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        selectedReview = results[0]
        selReviews2.hidden = True
        txtaPastReview2.hidden = False
        btnGoToReview2.hidden = False
    }
    query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaReview}' AND u.username = '${userNameFriend}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if (results[0] != '' && results.length == 1)
        rating = `${userNameFriend.trim()} rated "${newMediaReview}" a ${results[0]}/10.00 and left`
    else
        rating = `${userNameFriend.trim()} hasn't rated "${newMediaReview}" yet, but did leave`
    if (selectedReview == '')
        txtaPastReview2.value = "You have not selected one of your friend's past reviews to view."
    else {
        txtaPastReview2.value = `${rating} this review:\n"${selectedReview}"`
    }
  }
    
}

btnGoToReview2.onclick=function(){
    let placeholder = selReviews2.text
    let placeholder2 = placeholder[0] + placeholder[0]
    let mediaReview = ''
    let newMediaReview = ''
    let selectedReview = ''
    for (i = 0; placeholder2 != ' |'; i ++) {
        mediaReview = mediaReview + placeholder[i]
        placeholder2 = placeholder[i] + placeholder[i +1]
    }
    for (i = 0; i < mediaReview.length - 1; i++) {
        newMediaReview = newMediaReview + mediaReview[i]
    }
    mediaTitle = newMediaReview
    callAPI(requestURL)
    ChangeForm(Review)
}
