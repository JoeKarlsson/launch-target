Router.configure({
    layoutTemplate: 'layout'
  })
  .route('/', { name: 'setTimeTemplate' })


Router.route('/play', { name: 'launchTimer'});