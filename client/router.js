Router.configure({
    layoutTemplate: 'layout'
  })
  .route('/', { name: 'launchPlan' });

//this is the maps page
Router.route('/targets', { name : 'map'});
