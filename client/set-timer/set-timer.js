IT = {};

Template.selfTimer.helpers({
  // thing1 : function(){},
  // thing2 : function(){}
});

Template.selfTimer.events({
  'click .deploy' : function(event, template) {
    event.preventDefault();
    IT.now = function() { return ((moment().hours() * 60) + moment().minutes()) * 60};
    IT.inputIn = $('.intime').val() * 60;
    IT.lunchtime = IT.inputIn + IT.now();
    console.log(IT.now());
    console.log(IT.lunchtime);
    console.log(IT.lunchtime - IT.now());
    Router.go('/play');
  }
})