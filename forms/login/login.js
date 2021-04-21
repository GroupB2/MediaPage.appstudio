let profileIdentifier = ""
let user_id = ""

btnLogin.onclick = function() {
    profileIdentifier = inptUserName.value
    let password = inptPassword.value

    query2 = `SELECT user_id FROM user WHERE username = '${profileIdentifier}' AND password = '${password}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query2)
        let loginResults = JSON.parse(req.responseText)
        let user_id2 = loginResults[0]
        
        console.log(loginResults)
        console.log(user_id2)
        
        let found = False
        if (user_id2 != '' && loginResults.length == 1)
            found = True
        
        if (found == True){
            console.log(`Welcome ${profileIdentifier}!`)
            ChangeForm(profile)
        } else if (found == False)
            console.log("Oops, something went wrong... make sure your username and/or password is correct!")
}






