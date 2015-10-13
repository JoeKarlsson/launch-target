//launchTimer persistent render
Template.launchTimer.helpers({
  makeClock: function() {
    var launchTime = this.lunchtime - UI._globalHelpers.thisMoment();
    var clock = $('.clock').FlipClock(launchTime, {
      countdown: true
    });
  }
});

//launchTimer initial render
Template.launchTimer.rendered = function() {
  var launchTime = this.data.lunchtime - UI._globalHelpers.thisMoment();
  var clock = $('.clock').FlipClock(launchTime, {
    countdown: true
  });
}