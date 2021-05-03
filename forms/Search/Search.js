let mediaTitle = ""
let requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
let netID = 'mbs45316'
let pw = 'UCTRMX'
let score = ''
let count = ''
let releaseDate = ''
let season = ''
let ratings = [10, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0]
let currentUser = ''
let userNameFriend = ''
let homeMedia1 = ''
let homeMedia2 = ''
let homeMedia3 = ''
let homeMedia4 = ''
let homeMedia5 = ''
let homeMedia6 = ''

function onXHRLoad() {
    let message = ""
    let apiData = JSON.parse(this.responseText)
    
    lblTitle.value = "Error: Movie doesn't exist."
    btnTitle2.value = "Error: Movie doesn't exist."
    btnTitle3.value = "Error: Movie doesn't exist."

    mediaTitle = apiData.Title
    lblTitle.value = apiData.Title
    btnTitle2.value = apiData.Title
    btnTitle3.value = apiData.Title
    console.log(btnTitle3.value)
    lblRating.value = "Popcorn Score: " + apiData.imdbRating
    
    message = message + "Release Date: "+ apiData.Released + "\n"
    message = message + "\nRuntime: " + apiData.Runtime + "\n"
    message = message + "\nGenre: " + apiData.Genre + "\n"
    message = message + "\nDirector: " + apiData.Director + "\n"
    message = message + "\nActors: " + apiData.Actors + "\n"
    message = message + "\nPlot: " + apiData.Plot
    
    txtaMedia.value = message
    
    imgPoster.src = apiData.Poster
    
    countPlaceholder = apiData.imdbVotes
    count = ''
    if(countPlaceholder) {
        for (i = 0; i < countPlaceholder.length; i++) {
            if (countPlaceholder[i] != ',')
                count = count + countPlaceholder[i]
        }
    }
    
    count = parseInt(count)
    releaseDate = apiData.Released
    
    if(apiData.Title) {
        let query = "SELECT title FROM media"
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
    
        let found = false
        for (i = 0; i < results.length; i++) {
            if (mediaTitle == results[i][0]){
                found = true
                break 
            }
        }
        if (found == false) {
            let season = ''
            let releaseMonth = releaseDate[3] + releaseDate[4] + releaseDate[5]
    
            if (releaseMonth == 'Jan' || releaseMonth == 'Feb' || releaseMonth == 'Dec')
                season = 'Winter'
            else if (releaseMonth == 'Mar' || releaseMonth == 'Apr' || releaseMonth == 'May')
                season = 'Spring'
            else if (releaseMonth == 'Jun' || releaseMonth == 'Jul' || releaseMonth == 'Aug')
                season = 'Summer'
            else if (releaseMonth == 'Sep' || releaseMonth == 'Oct' || releaseMonth == 'Nov')
                season = 'Fall'
            else 
                season = "Hasn't been released"
    
            query = `INSERT INTO media (title, avg_score, vote_count, season, genre) VALUES ('${apiData.Title}', ${apiData.imdbRating}, ${count}, '${season}', '${apiData.Genre}')`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        }
    }
}

function callAPI(requestURL) {
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'https://cors.bridged.cc/' + requestURL)
    
    /* Headers */
    // if you need to set the returned data type, use this line of code: 
    //xhttp.setRequestHeader('Content-Type', 'application/json')
    
    xhttp.addEventListener('load', onXHRLoad)
    xhttp.send()
    
}

function totalScore(mediaTitle) {
    query = `SELECT avg_score, vote_count FROM media WHERE title = '${mediaTitle}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    
    avg = results[0][0]
    count = results[0][1]
    
    return avg * count
}

btnSearch.onclick=function() {
  mediaTitle = inptSearch.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch.value = ''
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
    
    query = `SELECT watchlist_status FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if (results[0] == 'Yes') {
        btnWatchlist.value = 'Remove'
        btnWatchlist2.value = 'Remove'
        btnWatchlist3.value = 'Remove'
    }
    else {
        btnWatchlist.value = 'Add to List'
        btnWatchlist2.value = 'Add to List'
        btnWatchlist3.value = 'Add to List'
    }
    
}

Search.onshow=function(){
    callAPI(requestURL)
    hmbrMenu.clear()    // clear out choices before adding ones you want
    hmbrMenu.addItem("Home")
    hmbrMenu.addItem("Profile")
    hmbrMenu.addItem("Friends")
    hmbrMenu.addItem("Watchlist")
    hmbrMenu.addItem("Movie Theaters")
    hmbrMenu.addItem("Twitter")
    hmbrMenu.addItem("Log Out")
    drpRate.clear()
    for (i = 0; i < ratings.length; i++)
        drpRate.addItem(ratings[i])
    drpRate.value = 'Rate'
    drpRate2.value = 'Rate'
    drpRate3.value = 'Rate'
    
    query = `SELECT watchlist_status FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if (results[0] == 'Yes') {
        btnWatchlist.value = 'Remove'
        btnWatchlist2.value = 'Remove'
        btnWatchlist3.value = 'Remove'
    }
    else {
        btnWatchlist.value = 'Add to List'
        btnWatchlist2.value = 'Add to List'
        btnWatchlist3.value = 'Add to List'
    }
    
    
    query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if (results[0] != '' && results.length == 1) {
        drpRate.value = results[0]
        drpRate2.value = results[0]
        drpRate3.value = results[0]
    }
}


hmbrMenu.onclick=function(s) {
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

drpRate.onclick=function(s){
  
  if (typeof(s) == "object") {
    return                     
  } 
  else {
        query = `SELECT mr.user_id, mr.media_id FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        if(results.length == 0) {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]
        
            query = `INSERT INTO media_rating (user_id, media_id, rating) VALUES (${user_id}, ${media_id}, ${s})`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            drpRate.value = s
            drpRate2.value = s
            drpRate3.value = s
        }
        else {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]   
        
            query = `UPDATE media_rating SET rating = ${s} WHERE user_id = ${user_id} AND media_id = ${media_id}`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            drpRate.value = s
            drpRate2.value = s
            drpRate3.value = s
        }
   }
}

btnReview.onclick=function(){
  ChangeForm(Review)
}

btnWatchlist.onclick=function(){
    if (btnWatchlist.value == 'Add to List') {
        query = `SELECT mr.user_id, mr.media_id FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        if(results.length == 0) {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]
        
            query = `INSERT INTO media_rating (user_id, media_id, watchlist_status) VALUES (${user_id}, ${media_id}, 'Yes')`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            btnWatchlist.value = 'Remove'
            btnWatchlist2.value = 'Remove'
            btnWatchlist3.value = 'Remove'
        }
        else {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]   
        
            query = `UPDATE media_rating SET watchlist_status = 'Yes' WHERE user_id = ${user_id} AND media_id = ${media_id}`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            btnWatchlist.value = 'Remove'
            btnWatchlist2.value = 'Remove'
            btnWatchlist3.value = 'Remove'
        }
    }
    else {
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]   
        
            query = `UPDATE media_rating SET watchlist_status = 'No' WHERE user_id = ${user_id} AND media_id = ${media_id}`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            btnWatchlist.value = 'Add to List'
            btnWatchlist2.value = 'Add to List'
            btnWatchlist3.value = 'Add to List'
    }
}
