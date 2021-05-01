btnSearch20.onclick=function() {
  mediaTitle = inptSearch20.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch20.value = ''
  
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

PastReviews.onshow=function(){
    hmbrMenu20.clear()    // clear out choices before adding ones you want
    hmbrMenu20.addItem("Home")
    hmbrMenu20.addItem("Profile")
    hmbrMenu20.addItem("Friends")
    hmbrMenu20.addItem("Watchlist")
    hmbrMenu20.addItem("Movie Theaters")
    hmbrMenu20.addItem("Log Out")
    txtaPastReview.hidden = True
    btnGoToReview.hidden = True
    btnSubmit4.value = 'Search'
    selReviews.clear()
    selReviews.hidden = False
    txtaPastReview.hidden = True
    let item = ''
    query = `SELECT title, rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${currentUser}' AND mr.review IS NOT NULL ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Rating: ' + results[i][1]
        selReviews.addItem(item)
    }
}

hmbrMenu20.onclick=function(s) {
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
        case "Log Out":
            ChangeForm(logOut)
            break
    }
}

lblReset3.onclick=function(){
    selReviews.clear()
    selReviews.hidden = False
    txtaPastReview.hidden = True
    let item = ''
    query = `SELECT title, rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${currentUser}' AND mr.review IS NOT NULL ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Rating: ' + results[i][1]
        selReviews.addItem(item)
    }
    btnGoToReview.hidden = True
}

selReviews.onclick=function(){
   btnSubmit4.value = 'Submit'
}

btnSubmit4.onclick=function(){
  if (btnSubmit4.value == 'Search')
    btnGoToReview.hidden = True
  if (inptPastReview.value != '') {
    txtaPastReview.hidden = True
    selReviews.hidden = False
    selReviews.clear()
    let un = inptPastReview.value
    query = `SELECT title, rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${currentUser}' AND mr.review IS NOT NULL ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Rating: ' + results[i][1]
        selReviews.addItem(item)
    }
    inptPastReview.value = ''
    btnSubmit4.value = 'Submit'
  }
else {
    btnSubmit4.value = 'Search'
    let placeholder = selReviews.text
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
        query = `SELECT review FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaReview}' AND u.username = '${currentUser}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        selectedReview = results[0]
        selReviews.hidden = True
        txtaPastReview.hidden = False
        btnGoToReview.hidden = False
    }
    query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaReview}' AND u.username = '${currentUser}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if (results[0] != '' && results.length == 1)
        rating = `You rated "${newMediaReview}" a ${results[0]}/10.00 and`
    else
        rating = `You haven't rated "${newMediaReview}" yet, but you`
    if (selectedReview == '')
        txtaPastReview.value = 'You have not selected a past review to view.'
    else {
        txtaPastReview.value = `${rating} left this review:\n"${selectedReview}"`
    }
  }
    
}

btnGoToReview.onclick=function(){
    let placeholder = selReviews.text
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
    ChangeForm(WriteReview)
}
