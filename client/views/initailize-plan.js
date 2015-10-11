Template.initializePlan.events({
  'click #initializePlanButton': function (event) {
    event.preventDefault();
    var resultId = Launches.insert({ test: 'foo' });
    Router.go('launchPlan', { _id: resultId });
  }
});
