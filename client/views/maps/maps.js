//Global variable for setting default zoom in google maps
var MAP_ZOOM = 17;
var results;

//When app starts load google maps
Meteor.startup(function() {
  GoogleMaps.load({ v: '3', key: 'AIzaSyAG_bYopvQf3H2lrQBNfKJyo4fic2ETdFI', libraries: 'geometry,places'});
  // console.log('mapLoaded');
});

//Pull latitude and longitude from google maps api and return location zoom
Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // console.log(latLng);
    //Initialize the map once we  have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
  }
});

//Create google maps marker for current location
Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    // console.log(map);
    //get lat and long from current location
    var latLng = Geolocation.latLng();

    //variable within scope that sets current location
    var currentPost = new google.maps.LatLng(latLng.lat, latLng.lng);

    //variable that creates a new instance of marker information display
    var infowindow = new google.maps.InfoWindow();

    //drop marker on current location
    var marker = new google.maps.Marker({
      position: currentPost,
      map: map.instance
    });

    //get surrounding restaurants within radius
    console.log('map', map.instance);
    // console.log(google.maps.places.PlacesService(map.instance));

    //call on the document of food which is an array of objects
    var service = new google.maps.places.PlacesService(map.instance);
    service.nearbySearch({
      location: currentPost,
      radius: 500,
      types: ['food']
    }, callback);

    //Error checking to check for status of query
    function callback(results, status) {
      // debugger;
      if (status === google.maps.places.PlacesServiceStatus.OK) {

        //helper function returns array of nearby restuarants
        // debugger;
        // Template.map.helpers({
        //   getListTargets: function() {
        //       console.log(results);
        //       return results;
        //     }
        // });
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);

          //Create target item on the DOM
          makeTargetListItem(results[i]);
        }
      }
    }

    //create marker for restaurant locations within radius
    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map.instance,
        position: place.geometry.location
      });

    //event listener that loads resturant information into infowindow.
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map.instance, this);
    });
    }
  });
});

//Call's targets-list and appends a div for each instance of a resturant
function makeTargetListItem(targetItem) {
  $('.targets-list').append($("<div>", {html : targetItem.name}));
}