//Session switch for swapping between
//Launch in vs. Launch At
Template.registerHelper('thisMoment', function() {
   return (((moment().hours() * 60) + moment().minutes()) * 60) + moment().seconds();
});

Template.setTimeTemplate.helpers({
  inTimeSwitchSelected : function() {
    return Session.get('inTimeSwitchSelected');
  }
});


//init Session to inTime show
Template.setTimeTemplate.created = function() {
  Session.set('inTimeSwitchSelected', true);
}

Template.setTimeTemplate.events({
  'click #inTimeSwitch' : function() {
    Session.set('inTimeSwitchSelected', true)
  },
  'click #atTimeSwitch' : function() {
    Session.set('inTimeSwitchSelected', false)
  }
});

Template.pickerTemplate.rendered = function() {
  $('.hourValue').val('00');
  $('.minuteValue').val('15');
};

Template.pickerTemplate.events({
  /*
    * ######## HOUR EVENTS #########
    *
  */
  'click .incrementHour' : function(event, template) {
    event.preventDefault();

    // parse the current value
    var value = parseInt($('.hourValue').val());

    // cap on the amount of time
    if (value < 4) {
      value++;
      $('.hourValue').val( '0'+ value.toString());
    }
  },
  'click .decrementHour' : function(event, template) {
    event.preventDefault();

    // parse the current value
    var value = parseInt($('.hourValue').val());

    // cap on the least amount of time
    if (value > 0) {
      value--;
      $('.hourValue').val( '0'+ value.toString());
    }
  },
  /*
    * ######### MINUTE EVENTS ##########
    *
  */
  'click .incrementMinute' : function(event, template) {
    event.preventDefault();

    // parse the current value
    var value = parseInt($('.minuteValue').val());

    // cap on the amount of time
    if (value < 60) {
      value++;

      // if its a single digit append 0
      if (value < 10) {
        $('.minuteValue').val( '0'+ value.toString() );
      } else {
        $('.minuteValue').val( value.toString() );
      }
    }
  },
  'click .decrementMinute' : function(event, template) {
    event.preventDefault();

    // parse the current value
    var value = parseInt($('.minuteValue').val());

    // cap on the amount of time
    if (value > 15) {
      value--;

      // if its a single digit append 0
      if (value < 10) {
        $('.minuteValue').val( '0'+ value.toString() );
      } else {
        $('.minuteValue').val( value.toString() );
      }
    }
  }
});

Template.inTimeTemplate.rendered = function() {
  $('#dtBox').DateTimePicker({
    minTime : '00:15',
    maxTime : '04:00',
    minuteInterval : 5,
    setValueInTextboxOnEveryClick : true
  });
};

Template.inTimeTemplate.events({
  'click .deploy' : function(event, template) {
    event.preventDefault();
    var now = UI._globalHelpers.thisMoment();
    var hrs = ($('.intime').val().substring(0, 2));
    var mins = ($('.intime').val().substring(3, 5));
    var inputIn = ((Number(hrs) * 60) + Number(mins)) * 60
    Launches.update({_id : this._id}
      , { $set : { lunchtime : (inputIn + now)} });
    Router.go('launchTimer', { _id : this._id });
  }
})


Template.atTimeTemplate.rendered = function() {
  $('#dtBox').DateTimePicker({
    minuteInterval : 5,
    setValueInTextboxOnEveryClick : true,
    timeFormat : 'hh:mm AA',
    isPopup : false
  });
};

Template.atTimeTemplate.events({
  'click .deploy' : function(event, template) {
    event.preventDefault();
    var now = UI._globalHelpers.thisMoment();
    var ampm = $('.attime').val().substring(6, 8);
    var hrs = ($('.attime').val().substring(0, 2));
    var mins = ($('.attime').val().substring(3, 5));
    if (ampm == 'PM') {
      hrs = Number(hrs) + 12;
    };
    var launchTarget = (((Number(hrs) * 60) + Number(mins)) * 60);
    Launches.update({_id : this._id},
      { $set : { lunchtime : launchTarget} });
    var inputIn = launchTarget - now;
    if(inputIn < 900 || inputIn > 14400) {
      alert('please plan between 15 minutes and 4 hours');
    } else {
      Router.go('launchTimer', { _id : this._id });
   }
  }
})