Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', { name: 'initializePlan' });

Router.route('/plan/:_id', {
  name: 'launchPlan',
  data: function () {
    return Launches.findOne(this.params._id);
  }
});

Router.route('/plan/:_id/select', {
  name: 'selectPosition'
});

Router.route('/plan/:_id/targets', {
  name: 'selectTargets',
  data: function () {
    return Launches.findOne(this.params._id);
  }
});

Router.route('/plan/:_id/setTime', {
  name: 'setTimeTemplate',
  data: function() {
    return Launches.findOne(this.params._id);
  }
});

Router.route('/launch/:_id', {
 name: 'finalLaunchPlan',
 data: function() {
  return Launches.findOne(this.params._id);
 }
});