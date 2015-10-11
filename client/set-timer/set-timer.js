IT = {};

// Template.NAME.helpers({
//   // thing1 : function(){},
//   // thing2 : function(){}
// });

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
    IT.now = function() { return ((moment().hours() * 60) + moment().minutes()) * 60};
    var hrs = ($('.intime').val().substring(0, 2));
    var mins = ($('.intime').val().substring(3, 5));
    IT.inputIn = ((Number(hrs) * 60) + Number(mins)) * 60
    IT.lunchtime = IT.inputIn + IT.now();
    // Router.go('/play');
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
    IT.now = function() { return ((moment().hours() * 60) + moment().minutes()) * 60};
    var ampm = $('.attime').val().substring(6,8);
    var hrs = ($('.attime').val().substring(0, 2));
    var mins = ($('.attime').val().substring(3, 5));
    if (ampm == 'PM') {
      hrs = Number(hrs) + 12;
    };
    IT.inputIn = ((Number(hrs) * 60) + Number(mins)) * 60
    IT.lunchtime = IT.inputIn + IT.now();
    console.log(hrs);
    console.log(mins);
    console.log(IT.inputIn);
    // Router.go('/play');
  }
})