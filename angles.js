/* A modulo function that takes negatives into account */
Number.prototype.mod = function(n) { return ((this%n)+n)%n; }

var Angles = {
  /* The difference between two angles, relative to 'a' */
  differenceBetween: function(a, b) {
    var diff = ((b - a) + 180) % 360 - 180;

    if ((diff > 180) || (diff < -180)) { diff = diff.mod(360); }

    return diff;
  },
  /* 0 = same angle, -1 = counter clockwise, 1 = clockwise */
  directionBetween: function(a, b) {
    var diff = this.differenceBetween(a, b);
    return diff > 0 ? 1 : diff < 0 ? -1 : 0;
  },
  toRadians: function(a) { return a * (Math.PI / 180); },
  toDegrees: function(a) { return a * (180 / Math.PI); },
}
