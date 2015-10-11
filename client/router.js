Router.configure({
    layoutTemplate: 'layout'
  })
  .route('/', { name: 'selfTimer' })


Router.route('/play', { name: 'launchTimer'});