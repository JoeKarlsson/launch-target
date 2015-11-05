Template.targetList.helpers({
  allTargets : function () {
    return Session.get('allTargets');
  }
});

Template.targetList.events({
  'click #setTimerBtn' : function (event) {
    event.preventDefault();

    var allSelectedLaunches = Session.get('selectedLaunches');
    var latLng = Session.get('latLng');
;
    var launchID = Launches.insert({ finalLaunches : allSelectedLaunches, currentLocation :  latLng });

    //When saved - redirect to next screen
    Router.go('setTimeTemplate', { _id : launchID });
  }
});