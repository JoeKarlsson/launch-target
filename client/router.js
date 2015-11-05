Router.configure({
  layoutTemplate : 'layout',
  loadingTemplate : 'loading',
  notFoundTemplate : 'notFound'
});

Router.route('/', { name : 'selectTargets' });


Router.route('/setTime/:_id/', {
  name : 'setTimeTemplate',
  data : function() {
    return Launches.findOne(this.params._id);
  }
});

Router.route('/launch/:_id', {
  name : 'finalLaunchPlan',
  data : function() {
    return Launches.findOne(this.params._id);
  }
});