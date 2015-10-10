Template.selfTimer.helpers({
  // thing1 : function(){},
  // thing2 : function(){}
});

Template.selfTimer.events({
  'click .deploy' : function(event, template) {
    event.preventDefault();
    var now = ((moment().hours() * 60) + moment().minutes()) * 60;
    var inputIn = $('.intime').val() * 60;
    var lunchtime = inputIn + now;
  }
})