IT = {};

// Template.NAME.helpers({
//   // thing1 : function(){},
//   // thing2 : function(){}
// });

Template.setTimeTemplate.helpers({
  inTimeSwitchSelected : function() {
    return Session.get('inTimeSwitchSelected');
  }
});

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
    Router.go('/play');
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
    IT.lunchtime = ((Number(hrs) * 60) + Number(mins)) * 60
    IT.inputIn = IT.lunchtime - IT.now();
    if(IT.inputIn < 900 || IT.inputIn > 14400) {
      alert('please plan between 15 minutes and 4 hours');
    } else {
      alert('Launch set in T-' + IT.inputIn + 'seconds');
      Router.go('/play');
    }
  }
})