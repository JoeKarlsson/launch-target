Router.configure({
    layoutTemplate: 'layout'
  })
  .route('/', { name: 'atTimeTemplate' })


Router.route('/play', { name: 'launchTimer'});