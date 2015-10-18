var selectCount = 0;
var setTimeButton = null;
var selectedLaunches = [];

function validateSelects ($button, verifiedSource) {
  if (verifiedSource > 0) {
    $button.attr('disabled', false);
  } else {
    $button.attr('disabled', true);
  }
}

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
      Session.set('selectedLaunches', selectedLaunches)
      //selectedLaunches.push(this);
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