Meteor.publish('launches', function() {
  return Launches.find();
});