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
/*
This gets your current location and marks it, then also marks the other 4 
locations coded below. You could hard-code these like they are or 
use a variable. 
* remember, you may have to zoom out the map to see all of the markers. 

Before this will work, you need a Google Cloud API key that is enabled
for use with Google Maps and Google Places API's, and that is associated 
with a Billing account (in case you are a hacker). 
  
So do this: 
Get a Google Maps api key and then enable it for Google Maps APIs and 
for Google Places APIs (most common ones). To enable the key with these two, 
go to your Google Maps Console (search “google api 
key dashboard console”). Then click left menu 
‘Credentials’. Pick your API key, and click 'Library' in left side menu. On next 
page click the ‘Maps Javascript API’ one. On next 
page click ‘Enable’. Repeat for 'Places API'. 

Next you have to go to billing and give Google your 
credit card for this API. You can cancel this when course is done 
(if you get charged at all, it will only be pennies). 

Now put your API key in the apikey property. 
*/

// say I got this data from an API call I made to 
// Google (using my Postman-generated URL). 

myPlaces = [
              {name: "Zio's",lat:41.258650,lon:-95.937190},
              {name: "Godfathers Pizza",lat:41.259690,lon:-95.933220}
            ]

var marker
var infowindow
var currentLat, currentLong

function gotLocation(location, lat, long) {

    GoogleMap4.mapOptions.latitude = location.coords.latitude
    GoogleMap4.mapOptions.longitude = location.coords.longitude
    
    currentLat22 =location.coords.latitude
    currentLong22 = location.coords.longitude
    console.log(`lat and long are ${currentLat22} and ${currentLong22}`)
    GoogleMap4.refresh()

    //Put a marker on our location
    point1 = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
    marker1 = GoogleMap4.setMarker({
        position: point1,
        title: "My Location"    // hover by balloon tip tooltip name
    })

  //Alamo Drafthouse
    point2 = new google.maps.LatLng(41.25772803840716, -95.96113807316209);
    marker2 = GoogleMap4.setMarker({
        position: point2
    })

    //Film Streams' Ruth Sokolof Theater
    point3 = new google.maps.LatLng(41.26619945311871, -95.93434147501375);
    marker3 = GoogleMap4.setMarker({
        position: point3
    })

    //Film Streams' Dundee Theater
    point4 = new google.maps.LatLng(41.2600003684995, -95.98986735781811);
    marker4 = GoogleMap4.setMarker({
        position: point4
    })

    //Aksarben Cinema
    point5 = new google.maps.LatLng(41.240056972286425, -96.01573220199852);
    marker5 = GoogleMap4.setMarker({
        position: point5
    })

   //Dream Theaters
    point6 = new google.maps.LatLng(41.24841694387101, -96.02941840199834);
    marker6 = GoogleMap4.setMarker({
        position: point6
})

   //Regal Omaha
    point7 = new google.maps.LatLng(41.31380430017689, -96.02828074432465);
    marker7 = GoogleMap4.setMarker({
        position: point7
        })

   //Marcus Twin Creek Cinema
    point8 = new google.maps.LatLng(41.14724633933665, -95.97117478850885);
    marker8 = GoogleMap4.setMarker({
        position: point8
        })

   //AMC Theatres
    point9 = new google.maps.LatLng(41.26707272174916, -96.06823957316185);
    marker9 = GoogleMap4.setMarker({
        position: point9
        })
        
    //Marcus Majestic Cinema of Omaha
    point10 = new google.maps.LatLng(41.29366456489825, -96.1359223866532);
    marker10 = GoogleMap4.setMarker({
        position: point10
        })      
          
    //Westwood Cinema 8
    point11 = new google.maps.LatLng(41.23216366237787, -96.10822073083472);
    marker11 = GoogleMap4.setMarker({
        position: point11
        })          
         
    //Lozier IMAX at Omaha's Henry Doorly Zoo
    point12 = new google.maps.LatLng(41.22840756010603, -95.92789703083479);
    marker12 = GoogleMap4.setMarker({
        position: point12
        })        
        
  //Alamo Drafthouse Cinema - La Vista
    point13 = new google.maps.LatLng(41.17944248055297, -96.11548451549211);
    marker13 = GoogleMap4.setMarker({
        position: point13
        })        
        
    
    let tempPoint = ""
    let tempMarker = ""
    for (i = 0; i < myPlaces.length;i++) {
      tempPoint = new google.maps.LatLng(myPlaces[i].lat,myPlaces[i].lon)
      tempMarker = GoogleMap4.setMarker({
        position: tempPoint
      })
    }
}


btnCL4.onclick = function() {
    // have to run this before you do anything else - call this getLocation button
    navigator.geolocation.getCurrentPosition(gotLocation)
    NSB.WaitCursor(true)
}

Maps.onshow=function(){
    hmbrMenuMaps.clear()    // clear out choices before adding ones you want
    hmbrMenuMaps.addItem("Home")
    hmbrMenuMaps.addItem("Profile")
    hmbrMenuMaps.addItem("Friends")
    hmbrMenuMaps.addItem("Watchlist")
    hmbrMenuMaps.addItem("Movie Theaters")
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
        case "Log Out":
            ChangeForm(logOut)
            break
    }
}