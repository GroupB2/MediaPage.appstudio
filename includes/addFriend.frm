{
  "!type": "Form",
  "_uuid": "5ae27733803a4cd1b7fbbab35e954958",
  "HTML": "",
  "attributes": "",
  "background": "",
  "backgroundimage": "images/BackgroundPhoto.jpg",
  "borderColor": "",
  "borderStyle": "",
  "borderWidth": "",
  "cached_js": "lblMessage2.hidden = True\n\nbtnSearch8.onclick=function() {\n  mediaTitle = inptSearch8.value\n  requestURL = \"http://www.omdbapi.com/?t=\" + mediaTitle + \"&apikey=2c27ce9a\"\n  callAPI(requestURL)\n  inptSearch8.value = ''\n  \n  drpRate.value = 'Rate'\n  drpRate2.value = 'Rate'\n  drpRate3.value = 'Rate'\n  \n    query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `\n    req = Ajax(\"https://ormond.creighton.edu/courses/375/ajax-connection.php\", \"POST\", \"host=ormond.creighton.edu&user=\" + netID + \"&pass=\" + pw + \"&database=375groupb2&query=\" + query)\n    results = JSON.parse(req.responseText)\n    if (results[0] != '' && results.length == 1) {\n        drpRate.value = results[0]\n        drpRate2.value = results[0]\n        drpRate3.value = results[0]\n    }\n    \n    ChangeForm(Search)\n}\n\n\naddFriend.onshow=function(){\n    hmbrMenu7.clear()\n    hmbrMenu7.addItem(\"Home\")\n    hmbrMenu7.addItem(\"Profile\")\n    hmbrMenu7.addItem(\"Friends\")\n    hmbrMenu7.addItem(\"Watchlist\")\n    hmbrMenu7.addItem(\"Movie Theaters\")\n    hmbrMenu7.addItem(\"Log Out\")\n}\n\n//Hamburger function feature:\nhmbrMenu7.onclick=function(s){ \n    if (typeof(s) == \"object\")\n       return\n       \n    switch(s) {\n        case \"Home\":\n            //ChangeForm(homePage)\n            break\n        case \"Friends\":\n            ChangeForm(friendsList)\n            break\n        case \"Watchlist\":\n            //ChangeForm(watchList)\n            break\n        case \"Movie Theaters\":\n            //ChangeForm(movieTheaters)\n            break\n        case \"Profile\":\n            ChangeForm(profile)\n            break\n        case \"Log Out\":\n            ChangeForm(logOut)\n            break\n        }\n}\n\nbtnSearchFriend.onclick=function(){\n    let userNameFriend = inptFriendSearch.value\n    \n    //The following code grabs the user's id using the username they used when they first logged in with\n    let query = \"SELECT `user_id` FROM user WHERE `username` = '\" + profileIdentifier + \"'\"\n    console.log(query)\n    console.log(profileIdentifier)\n    req = Ajax(\"https://ormond.creighton.edu/courses/375/ajax-connection.php\", \"POST\", \"host=ormond.creighton.edu&user=\" + netID + \"&pass=\" + pw + \"&database=375groupb2&query=\" + query)\n        results = JSON.parse(req.responseText)\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0user_id = results[0]\n    //lblMessage2.textContent = `You are user '${profileIdentifier}' with the user id of '${user_id}'.`\n    \n    let query2 = \"INSERT INTO friend (`friend_id`,`username`,`user_id`) VALUES ('\" + user_id + \"', '\" + userNameFriend + \"', '\" + user_id + \"')\"\n    console.log(query2)\n    req = Ajax(\"https://ormond.creighton.edu/courses/375/ajax-connection.php\", \"POST\", \"host=ormond.creighton.edu&user=\" + netID + \"&pass=\" + pw + \"&database=375groupb2&query=\" + query2)\n    if (req.status == 200) { \n        if (req.responseText == 500) \n            lblMessage2.textContent = \"Hooray! You have successfully added a new friend :)\"\n        else\n            lblMessage2.hidden = False\n            lblMessage2.textContent = \"Oops, there was a problem adding the friend... make sure you spelled their username correctly!\"\n    } else \n        lblMessage2.textContent = \"Error: \" + req.status\n}\n\nbtnCancelSearch.onclick=function(){\n  ChangeForm(profile)\n}",
  "cached_js_script_hash": "bf31eda68398af970d0afb7c36305690",
  "children": [
    {
      "!type": "Input_bs4",
      "_uuid": "9f0494592a8f414190fe45acbcf94a74",
      "align": "",
      "attributes": "",
      "autocapitalize": "",
      "autocomplete": "",
      "autocorrect": "",
      "backgroundColor": "",
      "badge": "",
      "badgeAppearance": " badge-info",
      "bottom": "auto",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "class": "",
      "color": "",
      "datalist": "",
      "disabled": "",
      "display": "",
      "expanded_pmp": true,
      "fontFamily": "",
      "fontSize": "",
      "fontStyle": "",
      "fontWeight": "",
      "footer": "",
      "header": "",
      "headerCols": 2,
      "height": "auto",
      "hidden": "",
      "icon": "",
      "iconTitle": "",
      "id": "inptFriendSearch",
      "inputType": "text",
      "inputmode": "",
      "left": 15,
      "leftText": "username",
      "mAll": "",
      "mBottom": "",
      "mLeft": "",
      "mRight": "",
      "mTop": "",
      "max": "",
      "maxlength": "",
      "min": "",
      "minlength": "",
      "name": "",
      "onchange": "",
      "onclick": "",
      "oncopy": "",
      "oncut": "",
      "onfocusin": "",
      "onfocusout": "",
      "oninput": "",
      "onkeypress": "",
      "onkeyup": "",
      "onmousedown": "",
      "onmousemove": "",
      "onmouseout": "",
      "onmouseup": "",
      "onpaste": "",
      "onresize": "",
      "ontouchend": "",
      "ontouchmove": "",
      "ontouchstart": "",
      "pAll": "",
      "pBottom": "",
      "pLeft": "",
      "pRight": "",
      "pTop": "",
      "placeholder": "Enter text here",
      "popBody": "Body",
      "popClose": "hover",
      "popPosition": "",
      "popStyle": "popover",
      "popTitle": "Title",
      "readonly": "",
      "required": "",
      "right": "auto",
      "script": "",
      "size": "",
      "size-lg": 4,
      "spellcheck": "true",
      "step": "",
      "style": "",
      "top": 54,
      "validation": "",
      "value": "",
      "valueCols": 10,
      "width": 299
    },
    {
      "!type": "Button_bs4",
      "_uuid": "49c56b3d3cee43ebad036298c505edbc",
      "ChangeForm": "",
      "appearance": " btn-secondary",
      "backgroundColor": "",
      "badge": "",
      "badgeAppearance": " badge-info",
      "blockLevel": "",
      "borderColor": "",
      "borderStyle": "",
      "borderWidth": "",
      "bottom": "auto",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "class": "",
      "color": "",
      "disabled": "",
      "display": "",
      "expanded_pmp": true,
      "fontFamily": "",
      "fontSize": "10",
      "fontStyle": "",
      "fontWeight": "",
      "groupStyle": "",
      "grouping": "",
      "height": "auto",
      "hidden": "",
      "icon": "",
      "iconTitle": "",
      "id": "btnSearchFriend",
      "left": 237,
      "mAll": "",
      "mBottom": "",
      "mLeft": "",
      "mRight": "",
      "mTop": "",
      "onclick": "btnSearchFriend.onclick()",
      "onmousedown": "",
      "onmousemove": "",
      "onmouseout": "",
      "onmouseup": "",
      "onresize": "",
      "ontouchend": "",
      "ontouchmove": "",
      "ontouchstart": "",
      "outline": "",
      "pAll": "",
      "pBottom": "",
      "pLeft": "",
      "pRight": "",
      "pTop": "",
      "popBody": "Body",
      "popClose": "hover",
      "popPosition": "",
      "popStyle": "popover",
      "popTitle": "Title",
      "right": "auto",
      "script": "",
      "size": " btn-md",
      "style": "",
      "toggleControl": "",
      "top": 101,
      "value": "Add Friend",
      "width": "auto"
    },
    {
      "!type": "Button_bs4",
      "_uuid": "a01d6f79e05448fd8531e0e8726d98c7",
      "ChangeForm": "",
      "appearance": " btn-secondary",
      "backgroundColor": "",
      "badge": "",
      "badgeAppearance": " badge-info",
      "blockLevel": "",
      "borderColor": "",
      "borderStyle": "",
      "borderWidth": "",
      "bottom": "auto",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "class": "",
      "color": "",
      "disabled": "",
      "display": "",
      "expanded_pmp": true,
      "fontFamily": "",
      "fontSize": "10",
      "fontStyle": "",
      "fontWeight": "",
      "groupStyle": "",
      "grouping": "",
      "height": "auto",
      "hidden": "",
      "icon": "",
      "iconTitle": "",
      "id": "btnCancelSearch",
      "left": 176,
      "mAll": "",
      "mBottom": "",
      "mLeft": "",
      "mRight": "",
      "mTop": "",
      "onclick": "btnCancelSearch.onclick()",
      "onmousedown": "",
      "onmousemove": "",
      "onmouseout": "",
      "onmouseup": "",
      "onresize": "",
      "ontouchend": "",
      "ontouchmove": "",
      "ontouchstart": "",
      "outline": "",
      "pAll": "",
      "pBottom": "",
      "pLeft": "",
      "pRight": "",
      "pTop": "",
      "popBody": "Body",
      "popClose": "hover",
      "popPosition": "",
      "popStyle": "popover",
      "popTitle": "Title",
      "right": "auto",
      "script": "",
      "size": " btn-md",
      "style": "",
      "toggleControl": "",
      "top": 101,
      "value": "return",
      "width": "auto"
    },
    {
      "!type": "Label_bs4",
      "_uuid": "3b1bcb0609e642aa9f49802646fc02c2",
      "appearance": "dark",
      "backgroundColor": "white",
      "borderRadius": "0",
      "bottom": "auto",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "class": "",
      "color": "",
      "display": "",
      "expanded_pmp": true,
      "fontFamily": "",
      "fontSize": "10",
      "fontStyle": "",
      "fontWeight": "",
      "height": 38,
      "hidden": "",
      "id": "lblMessage2",
      "labelStyle": "text",
      "left": 53,
      "mAll": "",
      "mBottom": "",
      "mLeft": "",
      "mRight": "",
      "mTop": "",
      "onclick": "",
      "onmousedown": "",
      "onmousemove": "",
      "onmouseout": "",
      "onmouseup": "",
      "onresize": "",
      "ontouchend": "",
      "ontouchmove": "",
      "ontouchstart": "",
      "pAll": "",
      "pBottom": "",
      "pLeft": "",
      "pRight": "",
      "pTop": "",
      "right": "auto",
      "script": "",
      "style": "",
      "top": 139,
      "value": "",
      "width": 225
    },
    {
      "!type": "Input_bs4",
      "_uuid": "fc25f478bf9b4e569d0df4de612b33ae",
      "align": "",
      "attributes": "",
      "autocapitalize": "",
      "autocomplete": "",
      "autocorrect": "",
      "backgroundColor": "",
      "badge": "",
      "badgeAppearance": " badge-info",
      "bottom": "auto",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "class": "",
      "color": "",
      "datalist": "",
      "disabled": "",
      "display": "",
      "expanded_pmp": true,
      "fontFamily": "",
      "fontSize": "",
      "fontStyle": "",
      "fontWeight": "",
      "footer": "",
      "header": "",
      "headerCols": 2,
      "height": "37",
      "hidden": "",
      "icon": "",
      "iconTitle": "",
      "id": "inptSearch8",
      "inputType": "text",
      "inputmode": "",
      "left": "7",
      "leftText": "",
      "mAll": "",
      "mBottom": "",
      "mLeft": "",
      "mRight": "",
      "mTop": "",
      "max": "",
      "maxlength": "",
      "min": "",
      "minlength": "",
      "name": "",
      "onchange": "",
      "onclick": "",
      "oncopy": "",
      "oncut": "",
      "onfocusin": "",
      "onfocusout": "",
      "oninput": "",
      "onkeypress": "",
      "onkeyup": "",
      "onmousedown": "",
      "onmousemove": "",
      "onmouseout": "",
      "onmouseup": "",
      "onpaste": "",
      "onresize": "",
      "ontouchend": "",
      "ontouchmove": "",
      "ontouchstart": "",
      "pAll": "",
      "pBottom": "",
      "pLeft": "",
      "pRight": "",
      "pTop": "",
      "placeholder": "Search Media Here...",
      "popBody": "Body",
      "popClose": "hover",
      "popPosition": "",
      "popStyle": "popover",
      "popTitle": "Title",
      "readonly": "",
      "required": "",
      "right": "auto",
      "script": "",
      "size": "",
      "size-lg": 4,
      "spellcheck": "true",
      "step": "",
      "style": "",
      "top": "3",
      "validation": "",
      "value": "",
      "valueCols": 10,
      "width": "191"
    },
    {
      "!type": "Button_bs4",
      "_uuid": "208efef76211436f9564555f6b65e8ef",
      "ChangeForm": "",
      "appearance": " btn-secondary",
      "backgroundColor": "",
      "badge": "",
      "badgeAppearance": " badge-info",
      "blockLevel": "",
      "borderColor": "",
      "borderStyle": "",
      "borderWidth": "",
      "bottom": "auto",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "class": "",
      "color": "",
      "disabled": "",
      "display": "",
      "expanded_pmp": true,
      "fontFamily": "",
      "fontSize": "",
      "fontStyle": "",
      "fontWeight": "",
      "groupStyle": "",
      "grouping": "",
      "height": "auto",
      "hidden": "",
      "icon": "",
      "iconTitle": "",
      "id": "btnSearch8",
      "left": "202",
      "mAll": "",
      "mBottom": "",
      "mLeft": "",
      "mRight": "",
      "mTop": "",
      "onclick": "",
      "onmousedown": "",
      "onmousemove": "",
      "onmouseout": "",
      "onmouseup": "",
      "onresize": "",
      "ontouchend": "",
      "ontouchmove": "",
      "ontouchstart": "",
      "outline": "",
      "pAll": "",
      "pBottom": "",
      "pLeft": "",
      "pRight": "",
      "pTop": "",
      "popBody": "Body",
      "popClose": "hover",
      "popPosition": "",
      "popStyle": "popover",
      "popTitle": "Title",
      "right": "auto",
      "script": "",
      "size": " btn-md",
      "style": "",
      "toggleControl": "",
      "top": "3",
      "value": "Search",
      "width": "74"
    },
    {
      "!type": "Hamburger_bs4",
      "_uuid": "a87affb21c064a33a5d58b60b43f4988",
      "align": " dropdown-menu-right",
      "appearance": " btn-secondary",
      "backgroundColor": "",
      "badge": "",
      "badgeAppearance": " badge-info",
      "blockLevel": "",
      "borderColor": "transparent",
      "borderStyle": "",
      "borderWidth": "",
      "bottom": "auto",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "class": "",
      "color": "",
      "disabled": "",
      "display": "",
      "dropdown": "dropdown",
      "expanded_pmp": true,
      "fontFamily": "",
      "fontSize": "",
      "fontStyle": "",
      "fontWeight": "",
      "groupStyle": "",
      "grouping": "",
      "height": "auto",
      "hidden": "",
      "icon": "menu",
      "iconTitle": "",
      "id": "hmbrMenu7",
      "items": "!Heading\nItem 1\nItem 2\n-\n*Item 3 (disabled)",
      "left": "279",
      "mAll": "",
      "mBottom": "",
      "mLeft": "",
      "mRight": "",
      "mTop": "",
      "onclick": "",
      "onmousedown": "",
      "onmousemove": "",
      "onmouseout": "",
      "onmouseup": "",
      "onresize": "",
      "ontouchend": "",
      "ontouchmove": "",
      "ontouchstart": "",
      "outline": "",
      "pAll": "",
      "pBottom": "",
      "pLeft": "",
      "pRight": "",
      "pTop": "",
      "popBody": "Body",
      "popClose": "hover",
      "popPosition": "",
      "popStyle": "popover",
      "popTitle": "Title",
      "right": "auto",
      "script": "",
      "size": " btn-md",
      "style": "float:right;",
      "top": "3",
      "value": "",
      "width": "auto"
    }
  ],
  "class": "",
  "designHeight": 0,
  "designWidth": 0,
  "expanded_pmp": true,
  "fullScreen": "true",
  "height": 460,
  "id": "addFriend",
  "language": "JavaScript",
  "left": "0",
  "locked": false,
  "modal": "false",
  "onhide": "",
  "onkeypress": "",
  "onresize": "",
  "onshow": "addFriend.onshow()",
  "openMode": "none",
  "parentForm": "",
  "position": "absolute",
  "script": "lblMessage2.hidden = True\n\nbtnSearch8.onclick=function() {\n  mediaTitle = inptSearch8.value\n  requestURL = \"http://www.omdbapi.com/?t=\" + mediaTitle + \"&apikey=2c27ce9a\"\n  callAPI(requestURL)\n  inptSearch8.value = ''\n  \n  drpRate.value = 'Rate'\n  drpRate2.value = 'Rate'\n  drpRate3.value = 'Rate'\n  \n    query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `\n    req = Ajax(\"https://ormond.creighton.edu/courses/375/ajax-connection.php\", \"POST\", \"host=ormond.creighton.edu&user=\" + netID + \"&pass=\" + pw + \"&database=375groupb2&query=\" + query)\n    results = JSON.parse(req.responseText)\n    if (results[0] != '' && results.length == 1) {\n        drpRate.value = results[0]\n        drpRate2.value = results[0]\n        drpRate3.value = results[0]\n    }\n    \n    ChangeForm(Search)\n}\n\n\naddFriend.onshow=function(){\n    hmbrMenu7.clear()\n    hmbrMenu7.addItem(\"Home\")\n    hmbrMenu7.addItem(\"Profile\")\n    hmbrMenu7.addItem(\"Friends\")\n    hmbrMenu7.addItem(\"Watchlist\")\n    hmbrMenu7.addItem(\"Movie Theaters\")\n    hmbrMenu7.addItem(\"Log Out\")\n}\n\n//Hamburger function feature:\nhmbrMenu7.onclick=function(s){ \n    if (typeof(s) == \"object\")\n       return\n       \n    switch(s) {\n        case \"Home\":\n            //ChangeForm(homePage)\n            break\n        case \"Friends\":\n            ChangeForm(friendsList)\n            break\n        case \"Watchlist\":\n            //ChangeForm(watchList)\n            break\n        case \"Movie Theaters\":\n            //ChangeForm(movieTheaters)\n            break\n        case \"Profile\":\n            ChangeForm(profile)\n            break\n        case \"Log Out\":\n            ChangeForm(logOut)\n            break\n        }\n}\n\nbtnSearchFriend.onclick=function(){\n    let userNameFriend = inptFriendSearch.value\n    \n    //The following code grabs the user's id using the username they used when they first logged in with\n    let query = \"SELECT `user_id` FROM user WHERE `username` = '\" + profileIdentifier + \"'\"\n    console.log(query)\n    console.log(profileIdentifier)\n    req = Ajax(\"https://ormond.creighton.edu/courses/375/ajax-connection.php\", \"POST\", \"host=ormond.creighton.edu&user=\" + netID + \"&pass=\" + pw + \"&database=375groupb2&query=\" + query)\n        results = JSON.parse(req.responseText)\n\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0user_id = results[0]\n    //lblMessage2.textContent = `You are user '${profileIdentifier}' with the user id of '${user_id}'.`\n    \n    let query2 = \"INSERT INTO friend (`friend_id`,`username`,`user_id`) VALUES ('\" + user_id + \"', '\" + userNameFriend + \"', '\" + user_id + \"')\"\n    console.log(query2)\n    req = Ajax(\"https://ormond.creighton.edu/courses/375/ajax-connection.php\", \"POST\", \"host=ormond.creighton.edu&user=\" + netID + \"&pass=\" + pw + \"&database=375groupb2&query=\" + query2)\n    if (req.status == 200) { \n        if (req.responseText == 500) \n            lblMessage2.textContent = \"Hooray! You have successfully added a new friend :)\"\n        else\n            lblMessage2.hidden = False\n            lblMessage2.textContent = \"Oops, there was a problem adding the friend... make sure you spelled their username correctly!\"\n    } else \n        lblMessage2.textContent = \"Error: \" + req.status\n}\n\nbtnCancelSearch.onclick=function(){\n  ChangeForm(profile)\n}",
  "setFocusID": "",
  "style": "",
  "theme": "",
  "top": "0",
  "width": 320,
  "_functions": [
    {
      "!type": "Form",
      "_uuid": "a808037b124a40da9c8ee532c1096981",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "expanded_pmp": true,
      "id": "btnSearch8.onclick",
      "location": [
        2,
        3
      ],
      "script": "",
      "signature": "btnSearch8.onclick()"
    },
    {
      "!type": "Form",
      "_uuid": "2debf0c2044d4d0d868958e3d2b80a34",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "expanded_pmp": true,
      "id": "addFriend.onshow",
      "location": [
        25,
        26
      ],
      "script": "",
      "signature": "addFriend.onshow()"
    },
    {
      "!type": "Form",
      "_uuid": "4eb717ca09b9487b9885e191b763757f",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "expanded_pmp": true,
      "id": "hmbrMenu7.onclick",
      "location": [
        36,
        37
      ],
      "script": "",
      "signature": "hmbrMenu7.onclick(s)"
    },
    {
      "!type": "Form",
      "_uuid": "299779aca31641f6b54028065dc23df7",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "expanded_pmp": true,
      "id": "btnSearchFriend.onclick",
      "location": [
        62,
        63
      ],
      "script": "",
      "signature": "btnSearchFriend.onclick()"
    },
    {
      "!type": "Form",
      "_uuid": "783dd98ec99d4b8288fb6a9272e69eee",
      "cached_js": "",
      "cached_js_script_hash": "d41d8cd98f00b204e9800998ecf8427e",
      "children": [],
      "expanded_pmp": true,
      "id": "btnCancelSearch.onclick",
      "location": [
        87,
        88
      ],
      "script": "",
      "signature": "btnCancelSearch.onclick()"
    }
  ]
}