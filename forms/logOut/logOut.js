logOut.onshow=function(){
    hmbrMenu31.clear()    // clear out choices before adding ones you want
    hmbrMenu31.addItem("Home")
    hmbrMenu31.addItem("Profile")
    hmbrMenu31.addItem("Friends")
    hmbrMenu31.addItem("Watchlist")
    hmbrMenu31.addItem("Movie Theaters")
    hmbrMenu31.addItem("Log Out")
}

hmbrMenu31.onclick=function(s){
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


btnLogout.onclick = function() {
    currentUser = inptUser.value
    let password = inptPassword1.value

    query = `SELECT user_id FROM user WHERE username = '${currentUser}' AND password = '${password}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)


    let found = False
    if (results[0] != '' && results.length == 1)
        found = True

    if (found == True) {
        console.log(`${currentUser} has signed out!`)
        ChangeForm(loginPage)
    } else {
        console.log("Oops, couldn't sign out!")
        currentUser = ''
    }
}