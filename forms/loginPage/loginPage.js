btnLogin.onclick = function() {
    currentUser = inptUser.value
    let password = inptPassword1.value

    query = `SELECT user_id FROM user WHERE username = '${currentUser}' AND password = '${password}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
        
    let found = False
    if (results[0] != '' && results.length == 1)
        found = True
        
    if (found == True){
        console.log(`Welcome ${currentUser}!`)
        ChangeForm(home)
    } 
    else {
        console.log("Oops, something went wrong... make sure your username and/or password is correct!")
        currentUser = ''
        inptUser.value = ''
        inptPassword1.value = ''
    }
    
}