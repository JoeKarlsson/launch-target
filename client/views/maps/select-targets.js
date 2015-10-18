var selectCount = 0;
var setTimeButton = null;

var selectedLaunches = [];
var launchID;

Template.map.helpers({
  getLaunchID : function() {
    launchID = this._iad;
  }
});

function validateSelects ($button, verifiedSource) {
  if (verifiedSource > 0) {
    $button.attr('disabled', false);
  } else {
    $button.attr('disabled', true);
  }
}

//Save array when Set Launch Time button clicked
Template.selectTargets.events({
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
      }
    });

    //When saved - redirect to next screen
    Router.go('finalLaunchPlan', { _id : launchID });
  }
});

//Selecting Launch Target on the list
Template.targetListItem.events({
  'click .alert-box' : function (event, template) {
    this.include = !this.include;
    setTimeButton = setTimeButton || $('#gotoSetTime');

    var scb = template.$('.styled-checkbox');
    //If the box is unchecked, add the restaurant to our array
    if (this.include) {
      selectCount++;
      scb.addClass('checked');
      this.votes = 0;
      selectedLaunches.push(this);
      console.log(selectedLaunches);
    } else { //If it has already been selected - remove it from the array
      selectCount--;
      scb.removeClass('checked');

      //find the index of the object we want to remove
      var index = selectedLaunches.indexOf(this);

      //Then remove it with splice
      if (index > -1) {
        selectedLaunches.splice(index, 1);
      }

    }
    validateSelects(setTimeButton, selectCount);
  }
});