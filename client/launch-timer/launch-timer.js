Template.launchTimer.rendered = function() {
  var launchTime = this.data.lunchtime - UI._globalHelpers.thisMoment();
  var clock = $('.clock').FlipClock(launchTime, {
    countdown: true
  });
};