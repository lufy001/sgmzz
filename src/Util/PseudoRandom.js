var PseudoRandom = (function() {
  function PseudoRandom(value) {
    this.pseudoSeedReset(value);
  }
  PseudoRandom.prototype.pseudoSeedReset = function(value) {
    value = value || 233280 * Math.random() >>> 0;
    this.pseudoSeed = value;
    this.randomCount = 0;
  };
  PseudoRandom.prototype.random = function(max, min) {
    max = max || 1;
    min = min || 0;
    this.randomCount++;
    this.pseudoSeed = (this.pseudoSeed * 9301 + 49297) % 233280;
    var rnd = this.pseudoSeed / 233280;
    return min + rnd * (max - min);
  };
  return PseudoRandom;
})();