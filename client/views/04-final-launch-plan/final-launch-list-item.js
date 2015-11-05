var uberClientId = 'I8iDf46DcbPEC32PbibfPoBYBoHewzt8',
     uberServerToken = 'YOUR_SERVER_TOKEN';

// Create variables to store latitude and longitude
var userLatitude,
    userLongitude,
    barLatitude,
    barLongitude;

// Create variable to store timer
var timer;

var planId;
var voted = undefined;

Template.finalTargetListItem.helpers({
  getPlanId : function() {
    // reactive getParams method which will invalidate the comp if any part of the params change
    // including the hash.
    var controller = Iron.controller();
    var params = controller.getParams();
    planId = params._id;
  }
});

Template.finalTargetListItem.events({
  'click .ride_btn' : function (event, template) {
    // Redirect to Uber API via deep-linking to the mobile web-app
    var uberURL = 'https://m.uber.com/sign-up?';

    // Add parameters
    uberURL += 'client_id=' + uberClientId;
    if (typeof userLatitude != typeof undefined) uberURL += '&' + 'pickup_latitude=' + userLatitude;
    if (typeof userLongitude != typeof undefined) uberURL += '&' + 'pickup_longitude=' + userLongitude;
    uberURL += '&' + 'dropoff_latitude=' + barLatitude;
    uberURL += '&' + 'dropoff_longitude=' + barLongitude;
    uberURL += '&' + 'dropoff_nickname=' + 'Bar';

    // Redirect to Uber
    window.location.href = uberURL;
  }
});

//Voting for an item
Template.finalTargetListItem.events({
  'click .collection-item' : function (event, template) {
    //initialize this to self
    var self = this;

    if (voted === undefined) {
      voteForItem();
    } else {
      overrideVote();
    }

    function voteForItem() {
      //Get all of the final selected launches that have been saved to the session
      var allSelectedLaunches = Session.get('selectedLaunches');

      //Find the index of the currently selected launch item in the DB Array
      var index = allSelectedLaunches.findIndex( function(element) { return element.placeId == self.placeId } );

      //Currently selected bar
      var currentBar = allSelectedLaunches[index];

      //Get the total votes
      var totalVotes = currentBar.votes;
      totalVotes++;
      currentBar.votes = totalVotes;
      allSelectedLaunches[index] = currentBar;

      //Move the element with the most votes to the top of the list
      var mostVotes = currentBar;
      for (var i = 0; i < allSelectedLaunches.length; i++) {
        if (allSelectedLaunches[i].votes > currentBar.votes) {
          mostVotes = allSelectedLaunches[i];
          var indexMostVotes = allSelectedLaunches.findIndex( function(element) { return element.placeId == mostVotes.placeId } );
          allSelectedLaunches.splice(indexMostVotes, 1);
          allSelectedLaunches.unshift(mostVotes);
        }
      };

      //Update the whole final selected launches in the DB
      Launches.update(planId, { $set : { finalLaunches : allSelectedLaunches } }, function(error) {
        if (error) {
          // display the error to the user
          alert(error.reason);
        } else {
          console.log('Vote Added to ' + currentBar.name);
        }
      });

      //Materialize toast when item is voted on
      // Materialize.toast('Voted for ' + currentBar.name, 4000);
      voted = currentBar;

    }

    function overrideVote() {

      var allSelectedLaunches = Session.get('selectedLaunches');
      console.log(allSelectedLaunches, 'allSelectedLaunches');

      //Find the index of the currently selected launch item in the DB Array
      var indexNew = allSelectedLaunches.findIndex( function(element) { return element.placeId == self.placeId } );

      var indexOld = allSelectedLaunches.findIndex( function(element) { return element.placeId == voted.placeId } );

      //Currently selected bar
      var currentBar = allSelectedLaunches[indexNew];

      var oldBar = allSelectedLaunches[indexOld];

      //Get the total votes for the current bar
      var totalVotesCurrent = currentBar.votes;
      totalVotesCurrent++;
      currentBar.votes = totalVotesCurrent;
      allSelectedLaunches[indexNew] = currentBar;

      //remove the vote for the previously selected vote
      var totalVotesOld = oldBar.votes;
      totalVotesOld--;
      oldBar.votes = totalVotesOld;
      allSelectedLaunches[indexOld] = oldBar;

      //Move the element with the most votes to the top of the list
      var mostVotes = currentBar;
      for (var i = 0; i < allSelectedLaunches.length; i++) {
        if (allSelectedLaunches[i].votes > currentBar.votes) {
          mostVotes = allSelectedLaunches[i];
          var indexMostVotes = allSelectedLaunches.findIndex( function(element) { return element.placeId == mostVotes.placeId } );
          allSelectedLaunches.splice(indexMostVotes, 1);
          allSelectedLaunches.unshift(mostVotes);
        }
      };

      //Update the whole final selected launches in the DB
      Launches.update(planId, { $set : { finalLaunches : allSelectedLaunches } }, function(error) {
        if (error) {
          // display the error to the user
          alert(error.reason);
        } else {
          console.log('Vote Added to ' + currentBar.name);
        }
      });

      //Materialize toast when item is voted on
      // Materialize.toast('Voted for ' + currentBar.name, 4000);
      voted = currentBar;
    }

  }
});