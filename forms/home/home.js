btnSearchHome.onclick=function() {
  mediaTitle = inptSearchHome.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearchHome.value = ''
  
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
    
    imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
    
    imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
}

home.onshow=function(){
    lblWelcomeUser.value = `Welcome ${currentUser}`
    hmbrMenuHome.clear()    // clear out choices before adding ones you want
    hmbrMenuHome.addItem("Home")
    hmbrMenuHome.addItem("Profile")
    hmbrMenuHome.addItem("Friends")
    hmbrMenuHome.addItem("Watchlist")
    hmbrMenuHome.addItem("Movie Theaters")
    hmbrMenuHome.addItem("Log Out")
    
    imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            
    imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
    
    query = `SELECT title FROM media WHERE status_id = 1`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    
    counter = 0
    xArray = []
    for (i = 0; i < results.length; i++)
        xArray.push(i)
    while (counter != 3) {
        x = Math.floor(Math.random() * results.length)
        if (xArray.includes(x)) {
            mediaTitle = results[x]
            requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
            callAPI2(requestURL)
            delete xArray[x]
            counter++
            
        }
    }
    
    genres = []
    query = `SELECT title FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${currentUser}' AND (mr.review IS NOT NULL OR mr.rating IS NOT NULL OR mr.watchlist_status = 'Yes') ORDER BY RAND() LIMIT 1`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    randomMedia = results[0]
    
    lblRecommendation.value = `Since you viewed "${randomMedia}"`
    
    query = `SELECT genre FROM media WHERE title = '${results[0]}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    selectedString = results[0][0]
    selectedGenre = ''
    for (i = 0; i <= selectedString.length; i ++) {
        if (selectedString[i] == ',' || i == selectedString.length)
        {
            genres.push(selectedGenre)
            selectedGenre = ''
        }
        else if (selectedString[i] == ' ')
            selectedGenre = selectedGenre
        else
            selectedGenre = selectedGenre + selectedString[i]
    }
    query = ''
    fakeQuery = `SELECT title FROM media WHERE title != '${randomMedia}' AND`
    for (i = 0; i < genres.length; i++) {
        fakeQuery = fakeQuery + ` genre LIKE '%25${genres[i]}%25' AND`
    }
    for (i = 0; i < (fakeQuery.length - 4); i++) {
        query = query + fakeQuery[i]
    }
    query = query + `ORDER BY vote_count DESC LIMIT 3`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if (results.length == 3) {
        for (i = 0; i < 3; i++) {
            mediaTitle = results[i]
            requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
            callAPI3(requestURL)
        }
    }
    else {
        while (results.length != 3) {
            newGenresSet = new Set()
            newGenresArray = []
            while (newGenresSet.size != genres.length-1) {
                newGenresSet.add(genres[Math.floor(Math.random() * genres.length)])
            }
            newGenresArray = Array.from(newGenresSet)
            console.log(newGenresArray)
            query = ''
            fakeQuery = `SELECT title FROM media WHERE title != '${randomMedia}' AND`
            for (i = 0; i < newGenresArray.length; i++) {
                fakeQuery = fakeQuery + ` genre LIKE '%25${newGenresArray[i]}%25' AND`
            }
            for (i = 0; i < (fakeQuery.length - 4); i++) {
                query = query + fakeQuery[i]
            }
            query = query + `ORDER BY vote_count DESC LIMIT 3`
            console.log(query)
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
            console.log(results)
        }
        for (i = 0; i < 3; i++) {
            mediaTitle = results[i]
            requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
            callAPI3(requestURL)
        }
    }
}

hmbrMenuHome.onclick=function(s) {
    if (typeof(s) == "object") {
       return
    }
    switch(s) {
        case "Home":
            ChangeForm(home)
            imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            
            imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            break
        case "Profile":
            ChangeForm(profile)
            imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            
            imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            break
        case "Friends":
            ChangeForm(friendsList)
            imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            
            imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            break
        case "Watchlist":
            ChangeForm(Watchlist)
            imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            
            imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            break
        case "Movie Theaters":
            ChangeForm(Maps)
            imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            
            imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            break
        case "Log Out":
            ChangeForm(loginPage)
            imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            
            imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
            imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
            
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

function onXHRLoad2() {
    let apiData = JSON.parse(this.responseText)
   
    if (imgOurRec1.src == 'http://127.0.0.1:59235/MediaPage/') {
        imgOurRec1.src = apiData.Poster
        homeMedia1 = apiData.Title
    }
    else if (imgOurRec2.src == 'http://127.0.0.1:59235/MediaPage/') {
        imgOurRec2.src = apiData.Poster
        homeMedia2 = apiData.Title
    }
    else {
        imgOurRec3.src = apiData.Poster
        homeMedia3 = apiData.Title
    }
}

function callAPI2(requestURL) {
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'https://cors.bridged.cc/' + requestURL)
    
    /* Headers */
    // if you need to set the returned data type, use this line of code: 
    //xhttp.setRequestHeader('Content-Type', 'application/json')
    
    xhttp.addEventListener('load', onXHRLoad2)
    xhttp.send()
    
}

function onXHRLoad3() {
    let apiData = JSON.parse(this.responseText)
    
    if (imgYourRec1.src == 'http://127.0.0.1:59235/MediaPage/') {
        imgYourRec1.src = apiData.Poster
        homeMedia4 = apiData.Title
    }
    else if (imgYourRec2.src == 'http://127.0.0.1:59235/MediaPage/') {
        imgYourRec2.src = apiData.Poster
        homeMedia5 = apiData.Title
    }
    else {
        imgYourRec3.src = apiData.Poster
        homeMedia6 = apiData.Title
    }
}

function callAPI3(requestURL) {
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'https://cors.bridged.cc/' + requestURL)
    
    /* Headers */
    // if you need to set the returned data type, use this line of code: 
    //xhttp.setRequestHeader('Content-Type', 'application/json')
    
    xhttp.addEventListener('load', onXHRLoad3)
    xhttp.send()
    
}

imgOurRec1.onclick=function(){
    mediaTitle = homeMedia1
    requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
    callAPI(requestURL)
  
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
    imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
    
    imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
}

imgOurRec2.onclick=function(){
    mediaTitle = homeMedia2
    requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
    callAPI(requestURL)
  
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
    imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
    
    imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
}

imgOurRec3.onclick=function(){
    mediaTitle = homeMedia3
    requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
    callAPI(requestURL)
  
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
    imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
    
    imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
}

imgYourRec1.onclick=function(){
    mediaTitle = homeMedia4
    requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
    callAPI(requestURL)
  
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
    imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
    
    imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
}

imgYourRec2.onclick=function(){
    mediaTitle = homeMedia5
    requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
    callAPI(requestURL)
  
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
    imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
    
    imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
}

imgYourRec3.onclick=function(){
    mediaTitle = homeMedia6
    requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
    callAPI(requestURL)
  
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
    imgOurRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgOurRec3.src = 'http://127.0.0.1:59235/MediaPage/'
    
    imgYourRec1.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec2.src = 'http://127.0.0.1:59235/MediaPage/'
    imgYourRec3.src = 'http://127.0.0.1:59235/MediaPage/'
}
