Template.launchTimer.helpers({
  makeClock: function() {
    var launchTime = this.lunchtime - UI._globalHelpers.thisMoment();
    var clock = $('.clock').FlipClock(launchTime, {
      countdown: true
    });
  }
});