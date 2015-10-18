var launchID;

Template.map.helpers({
  getLaunchID : function() {
    launchID = this._id;
  }
});

//Save array when Set Launch Time button clicked
Template.selectTargets.events({
  'click #gotoSetTime' : function (event) {
    event.preventDefault();

    //console.log(this);
    launchID = this._id;
    var allSelectedLaunches = Session.get('selectedLaunches');
    Launches.update(launchID, { $set : { finalLaunches : allSelectedLaunches } }, function(error) {

      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        console.log('set launch time', allSelectedLaunches);
      }
    });

    //When saved - redirect to next screen
    Router.go('setTimeTemplate', { _id : launchID });
  }
});