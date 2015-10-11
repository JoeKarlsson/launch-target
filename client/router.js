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
  name: 'availableTargets'
});
