//Global variable for setting default zoom in google maps
var MAP_ZOOM = 17;
var results;

var selectCount = 0;
var setTimeButton = null;

var selectedLaunches = [];
var launchID;

Template.map.helpers({
  myHelper : function() {
    return Router.current().route.path(this);
  },
  getLaunchID : function() {
    launchID = this._id;
    //console.log('Get', launchID);
  }
});

//Save array when Set Launch Time button clicked
Template.map.events({
  'click #gotoSetTime' : function (event) {
    event.preventDefault();

    //console.log(this);
    launchID = this._id;
    Launches.update(launchID, { $set : { proposedLaunches : selectedLaunches } }, function(error) {

      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        console.log('set launch time', selectedLaunches);
        //Router.go('launch-timer', { _id : launchID });
      }
    });

    //console.log('set launch time', selectedLaunches);
    //Router.go('availableTargets');
    Router.go('setTimeTemplate', { _id : launchID });
  }
});

//When app starts load google maps
Meteor.startup(function() {
  GoogleMaps.load({ v : '3', key : 'AIzaSyAG_bYopvQf3H2lrQBNfKJyo4fic2ETdFI', libraries : 'geometry,places' });
});

function validateSelects ($button, verifiedSource) {
  if (verifiedSource > 0) {
    $button.attr('disabled', false);
  } else {
    $button.attr('disabled', true);
  }
}

//Pull latitude and longitude from google maps api and return location zoom
Template.map.helpers({
  geolocationError : function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions : function() {
    var latLng = Geolocation.latLng();

    // console.log(latLng);
    //Initialize the map once we  have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center : new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom : MAP_ZOOM
      };
    }
  },
  allTargets : function () {
    // return Launches.findOne(this._id).targets;
    return Session.get('allTargets');
  }
});

//Selecting Launch Target on the list
Template.targetListItem.events({
  'click .alert-box' : function (event, template) {
    this.include = !this.include;
    setTimeButton = setTimeButton || $('#gotoSetTime');

    var scb = template.$('.styled-checkbox');
    if (this.include) {
      selectCount++;
      scb.addClass('checked');
      selectedLaunches.push(this);
      //console.log('click add', selectedLaunches);
    } else {
      selectCount--;
      scb.removeClass('checked');

      //find the index of the object we want to remove
      var index = selectedLaunches.indexOf(this);

      //Then remove it with splice
      if (index > -1) {
        selectedLaunches.splice(index, 1);
        //console.log('click remove', selectedLaunches);
      }

    }
    validateSelects(setTimeButton, selectCount);
  }
});

//Create google maps marker for current location
Template.map.onCreated(function() {
  var self = this;

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
      position : currentPost,
      map : map.instance
    });

    //get surrounding restaurants within radius
    // console.log(google.maps.places.PlacesService(map.instance));

    //call on the document of food which is an array of objects
    var service = new google.maps.places.PlacesService(map.instance);
    service.nearbySearch({
      location : currentPost,
      radius : 500,
      types : ['food']
    }, callback);

    //Error checking to check for status of query
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var targets = results.map(function (target) {
          createMarker(target);
          var targetDetail = {
            name : target.name,
            placeId : target.place_id,
            include : false
          };
          return targetDetail;
        });
        Session.set('allTargets', targets);
      }
    }

    //create marker for restaurant locations within radius
    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map : map.instance,
        position : place.geometry.location,
        draggable : false
      });

      //event listener that loads resturant information into infowindow.
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map.instance, this);
      });
      return marker;
    }
  });
});
