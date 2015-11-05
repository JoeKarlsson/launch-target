//launchTimer persistent render
Template.flipclock.helpers({
  makeClock: function() {
    var launchTime = this.lunchtime - UI._globalHelpers.thisMoment();
    var clock = $('.clock').FlipClock(launchTime, {
      countdown: true
    });
  }
});

//launchTimer initial render
Template.flipclock.rendered = function() {
  var launchTime = this.data.launchtime - UI._globalHelpers.thisMoment();
  var clock = $('.clock').FlipClock(launchTime, {
    countdown: true
  });
}