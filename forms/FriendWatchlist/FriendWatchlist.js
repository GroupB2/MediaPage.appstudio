btnSearchFriendWatch.onclick=function() {
  mediaTitle = inptSearch4Copy.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch4Copy.value = ''
  
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

FriendWatchlist.onshow=function(){
    callAPI(requestURL)
    btnAddList.hidden = True
    hmbrFriendWatch.clear()    // clear out choices before adding ones you want
    hmbrFriendWatch.addItem("Home")
    hmbrFriendWatch.addItem("Profile")
    hmbrFriendWatch.addItem("Friends")
    hmbrFriendWatch.addItem("Watchlist")
    hmbrFriendWatch.addItem("Movie Theaters")
    hmbrFriendWatch.addItem("Log Out")
    selWatchlistFriend.clear()
    query = `SELECT m.title, m.avg_score FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${userNameFriend}' AND mr.watchlist_status = 'Yes' ORDER BY m.title`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Score: ' + results[i][1]
        selWatchlistFriend.addItem(item)
    }
    
        let NameQuery = "SELECT `first_name` FROM user WHERE `username` = '" + userNameFriend + "'"
        req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + NameQuery)
        resultsName = JSON.parse(req1.responseText)
        let FriendName = resultsName[0]

    
        let foundName = False
        if (FriendName != '' && resultsName.length == 1)
            foundName = True
        
        if (foundName == True){
            FriendFirstName = FriendName
            console.log(FriendFirstName)
            lblFriendWatchTitle.value= (`${FriendFirstName}'s Watchlist`)
            }else {
            lblFriendWatchTitle.value = Watchlist
        }

}

hmbrFriendWatch.onclick=function(s) {
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

btnAddList.onclick=function(){
    if (selWatchlistFriend.text != `This movie is not in ${userNameFriend}'s watchlist.`) {
        
        query = `SELECT mr.user_id, mr.media_id FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        if (results.length == 0) {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
    
            let placeholder = selWatchlistFriend.text
            let watchlistMedia = ''
            for (i = 0; placeholder[i] + placeholder[i+1] != ' |'; i ++) {
                watchlistMedia = watchlistMedia + placeholder[i]
            }
            mediaTitle = watchlistMedia
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            console.log(query)
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]   
            
            query = `INSERT INTO media_rating (user_id, media_id, watchlist_status) VALUES (${user_id}, ${media_id}, 'Yes')`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        }
        
        else {
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
    
            let placeholder = selWatchlistFriend.text
            let watchlistMedia = ''
            for (i = 0; placeholder[i] + placeholder[i+1] != ' |'; i ++) {
                watchlistMedia = watchlistMedia + placeholder[i]
            }
            mediaTitle = watchlistMedia
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            console.log(query)
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0] 
            
            query = `UPDATE media_rating SET watchlist_status = 'Yes' WHERE user_id = ${user_id} AND media_id = ${media_id}`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        }
        
        btnAddList.hidden = True
        selWatchlistFriend.clear()
    
        query = `SELECT m.title, m.avg_score FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${userNameFriend}' AND mr.watchlist_status = 'Yes' ORDER BY m.title`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        for (i = 0; i < results.length; i++) {
            item = results[i][0] + ' | Score: ' + results[i][1]
            selWatchlistFriend.addItem(item)
        }
    }
}

btnSubmitFriend.onclick=function(){
    if (inptWatchlistMediaFriend.value != '') {
        selWatchlistFriend.clear()
        let searchName = inptWatchlistMediaFriend.value
        query = `SELECT m.title, m.avg_score FROM media_rating mr INNER JOIN user u ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE title = '${searchName}' AND mr.watchlist_status = 'Yes'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        console.log(results)
        if(results[0] != '' && results.length == 0) {
            item = `This movie is not in ${userNameFriend}'s watchlist.`
            selWatchlistFriend.addItem(item)
        }
        else {
            item = results[0][0] + ' | Score: ' + results[0][1]
            selWatchlistFriend.addItem(item)
        }
        inptWatchlistMediaFriend.value = ''
    }
    else {
        btnSubmitFriend.value = 'Search List'
        if (selWatchlistFriend.text != `This movie is not in ${userNameFriend}'s watchlist.`) {
            let placeholder = selWatchlistFriend.text
            let watchlistMedia = ''
            for (i = 0; placeholder[i] + placeholder[i+1] != ' |'; i ++) {
                watchlistMedia = watchlistMedia + placeholder[i]
            }
            mediaTitle = watchlistMedia
            requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
            callAPI(requestURL)
  
            drpRate.value = 'Rate'
            drpRate2.value = 'Rate'
            drpRate3.value = 'Rate'
  
            query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${userNameFriend}' `
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
            if (results[0] != '' && results.length == 1) {
                drpRate.value = results[0]
                drpRate2.value = results[0]
                drpRate3.value = results[0]
            }
            ChangeForm(Search)
        }
    }
}

selWatchlistFriend.onclick=function(){
    if (selWatchlistFriend.text != `This movie is not in ${userNameFriend}'s watchlist.`) {
        btnSubmitFriend.value = 'Go to Page'
        btnAddList.hidden = False
    }
}

inptWatchlistMediaFriend.onclick=function(){
  btnSubmitFriend.value = 'Search List'
  btnAddList.hidden = True
}

btnResetFriendWatch.onclick=function(){
    selWatchlistFriend.clear()
    query = `SELECT m.title, m.avg_score FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${userNameFriend}' AND mr.watchlist_status = 'Yes' ORDER BY m.title`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Score: ' + results[i][1]
        selWatchlistFriend.addItem(item)
    }
}
