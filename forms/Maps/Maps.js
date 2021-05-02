btnSearch5.onclick=function() {
  mediaTitle = inptSearch5.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch5.value = ''
  
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
/*   TO USE THIS PROJECT 
This project uses a Google Places API to get rental apartments by CU. 
It then takes these results and uses them in a Google Maps API to make a map with clickable markers. 

1. Make sure your Google Project that the API key is for is attached to the Google Maps and Google Places API's (in Google Console > Libraries). 
2. Make sure your Google Project is attached to a billing account (you'll have to give them your credit card - you won't get charges, cancel after class is over)
3. Add your own Google API key to the Project Property 'extra headers' as indicated.
4. Add the same googleAPI key to the api call in 'requestURLApt' below as indicated
*/

let requestURL2 = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=theater&key=AIzaSyAGZ6PSIvz339qdRJ2ZMf1EMxESs5rbdJ4&location=41.265331,-95.949364&radius=5000"
var theaters = []
var infoTheaters = []

function onXHRLoad4() {

  // 'this' is another name for the object returned from the API call
  let apiData = JSON.parse(this.responseText)
  // good data coming back from API call

  for (i = 0; i < apiData.results.length; i++) 
    theaters[i] = {
      "description": apiData.results[i].name,
      "lat": apiData.results[i].geometry.location.lat,
      "lng": apiData.results[i].geometry.location.lng,
      "address": apiData.results[i].formatted_address
  }
}

function callAPI4(URL) {
  var xhttp = new XMLHttpRequest()

  // if you need cors (you'll get a cors error if you don't have it and you need it)
  // use this code to add the cors code to your url 
  xhttp.open('GET', 'https://cors.bridged.cc/' + requestURL2)

  // if you DON'T need cors use this code:
  //xhttp.open('GET',URL)

  // Headers
  // if you need to set the returned data type, use this line of code: 
  //xhttp.setRequestHeader('Content-Type', 'application/json')

  // if you need authorization token (stored in myToken) use this line of code: 
  // xhttp.setRequestHeader('Authorization', 'Bearer ' + myToken)

  // if you need a key and it's not in the url use code in one of the following
  // examples (think of headers as parameters)
  // or just use the Postman url which has all the parameters already added like I did here. 

  // make the API request
  xhttp.addEventListener('load', onXHRLoad4)
  xhttp.send()
}

// put down markers
window.onload = function() {
  callAPI4(requestURL2)
}

btnCL4.onclick = function() {
// description is what will show in Info window
  for (i = 0; i < theaters.length; i++) {
        infoTheaters[i] = {
          "description": theaters[i].description + "<br> " + theaters[i].address,
          "lat": theaters[i].lat,
          "lng": theaters[i].lng
        }
  }
  LoadMap()
}

// make the map with markers
function LoadMap() {

  var mapOptions = {
    center: new google.maps.LatLng(infoTheaters[0].lat, infoTheaters[0].lng),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions)

  //Create and open InfoWindow.
  var infoWindow = new google.maps.InfoWindow()
  var myLatlng
  for ( i = 0; i < infoTheaters.length; i++) {
    data = infoTheaters[i]
    myLatLng = new google.maps.LatLng(data.lat, data.lng)
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: data.description
    });    // leave semi-colon here
    //Attach click event to the marker.
    
    /*  when function inside (), means it is self-starting function - just runs without being called. 
    () after closing }) shows functions' parameters (if any) */
    (function(marker, data) {
        google.maps.event.addListener(marker, "click", function(e) {
              //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
              infoWindow.setContent("<div style = 'width:150px;min-height:35px'>" + data.description + "</div>")
              infoWindow.open(map, marker)
          })   
    }
    )(marker, data)  
    
  }  // for looop
}

Maps.onshow=function(){
    hmbrMenuMaps.clear()    // clear out choices before adding ones you want
    hmbrMenuMaps.addItem("Home")
    hmbrMenuMaps.addItem("Profile")
    hmbrMenuMaps.addItem("Friends")
    hmbrMenuMaps.addItem("Watchlist")
    hmbrMenuMaps.addItem("Movie Theaters")
    hmbrMenuMaps.addItem("Twitter")
    hmbrMenuMaps.addItem("Log Out")
}

hmbrMenuMaps.onclick=function(s) {
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