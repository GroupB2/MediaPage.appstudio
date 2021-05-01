

editProfile.onshow=function(){
    lblMessage1.value = ""
    lblMessage4.value = ""
    inptName.placeholder = currentUser
    txtaDescription.placeholder = profileDescription
    imgEdit.src = profilePicture
}


// Opens the profile picture selection modal:
btnPicEdit.onclick=function(){
    pictureSelect.show()
    pictureSelect.style.display = "block";
}


//Commits changes to the main profile page:
btnSaveChanges.onclick=function(){
    
    //The following code updates a user's username:
    if (inptName.value == "")
        currentUser = inptName.placeholder
    else{
        let newName = inptName.value
        let oldName = inptName.placeholder
        
        query = `SELECT username FROM user WHERE username = '${oldName}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        userNameData = JSON.parse(req.responseText)
        if (req.status == 200) {
            if (userNameData.length >= 0) {
                query = "UPDATE user SET `username` ='" + newName + "' WHERE `username` = '" + oldName + "'"
                req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
                if (req.status ==  200)  
                    if (req.responseText == 500){   
                        currentUser = newName
                        lblMessage1.textContent = `You have successfully updated ${oldName} to ${newName}.`
                    }else
                        lblMessage1.textContent = `There was a problem updating ${oldName} to ${newName}.`
                else   
                    lblMessage1.textContent = `Error: ${req.status}`
            }
        }
    }
    
    //The following code updates a user's profile description:
    if (txtaDescription.value == "")
        profileDescription = txtaDescription.placeholder
    else{
        let newDescription = txtaDescription.value
        let oldDescription = txtaDescription.placeholder
        
        query2 = `SELECT about FROM user WHERE username = '${currentUser}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query2)
        userDescriptionData = JSON.parse(req.responseText)
        if (req.status == 200) {
            if (userDescriptionData.length >= 0) {
                query3 = "UPDATE user SET `about` ='" + newDescription + "' WHERE `username` = '" + currentUser + "'"
                req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query3)
                if (req.status ==  200)  
                    if (req.responseText == 500){
                        profileDescription = newDescription
                        lblMessage4.textContent = `You have successfully updated your bio to ${newDescription}.`
                    }else
                        lblMessage4.textContent = `There was a problem updating your bio.`
                else   
                lblMessage4.textContent = `Error: ${req.status}`
            }
        }
    }
    
    //The following code updates a user's profile picture:
    newProfilePic = imgEdit.src
    
    query3 = "UPDATE user SET `profile_pic` ='" + newProfilePic + "' WHERE `username` = '" + currentUser + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query3)
    if (req.status ==  200)
        console.log("you have successfully updated your profile picture!")
        
    profilePicture = newProfilePic
    ChangeForm(profile)
}


//Discards the user's changes:
btnDiscardChanges.onclick=function(){
    editProfile.reset()
    ChangeForm(profile)
}