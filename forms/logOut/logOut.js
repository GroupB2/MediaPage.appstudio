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
}