Template.pickerTemplate.rendered = function() {
  $('.hourValue').html('00');
  $('.minuteValue').html('15');
};

Template.pickerTemplate.events({
  /*
    * ######## HOUR EVENTS #########
    *
  */
  'click .incrementHour' : function(event, template) {
    event.preventDefault();

    // parse the current value
    var value = parseInt($('.hourValue').html());

    // cap on the amount of time
    if (value < 3) {
      value++;
      $('.hourValue').html( '0'+ value.toString());
    } else if (value == 3) {
      value++;
      $('.hourValue').html( '04' )
      $('.minuteValue').html( '00' );
    }
  },
  'click .decrementHour' : function(event, template) {
    event.preventDefault();

    // parse the current value
    var value = parseInt($('.hourValue').html());

    // cap on the least amount of time
    if (value > 1) {
      value--;
      $('.hourValue').html( '0'+ value.toString());
    } else {
      value--;
      $('.hourValue').html( '00' );
      $('.minuteValue').html( '15' );
    }
  },
  /*
    * ######### MINUTE EVENTS ##########
    *
  */
  'click .incrementMinute' : function(event, template) {
    event.preventDefault();

    // parse the current value
    var value = parseInt($('.minuteValue').html());
    var hourValue = parseInt($('.hourValue').html());

    // cap on the amount of time
    if (value < 59 && hourValue !== 4) {
      value++;

      // if its a single digit append 0
      if (value < 10) {
        $('.minuteValue').html( '0'+ value.toString() );
      } else {
        $('.minuteValue').html( value.toString() );
      }
    } else if (hourValue <= 3){
      hourValue++;
      $('.hourValue').html( hourValue.toString() );
      $('.minuteValue').html( '00' );
    }
  },
  'click .decrementMinute' : function(event, template) {
    event.preventDefault();

    // parse the current value
    var value = parseInt($('.minuteValue').html());
    var hourValue = parseInt($('.hourValue').html());

    // cap on the amount of time to minimum 15 minutes
    if (hourValue == 0 && value > 15) {
      value--;

      $('.minuteValue').html( value.toString() );

    // if there is an hour value, then we can decrement
    } else if (hourValue > 0 && value >= 0) {

      value--;

      // if its greater than double digits (15 to 10)
      if (value > 9) {

        // just print the value
        $('.minuteValue').html( value.toString() );

        // else if its between 10 and 0, then append a 0
      } else if (value > 0 && value < 10) {
          $('.minuteValue').html( '0' + value.toString() );
      } else if (value <= 0) {

        // else, then we can minus an hour
          hourValue--;
          $('.minuteValue').html( '59' );
          $('.hourValue').html( hourValue.toString() );
      }

    }
  },
  'click .setTimeLaunch' : function(event, template) {
    event.preventDefault();
    var now = UI._globalHelpers.thisMoment();
    var hrs = $('.hourValue').html();
    var mins = $('.minuteValue').html();
    var inputIn = ((Number(hrs) * 60) + Number(mins)) * 60
    var launchtime = inputIn + now;
    Launches.update({_id : this._id}
      , { $set : { lunchtime : launchtime } });
    Router.go('finalLaunchPlan', { _id : this._id });
  }
});