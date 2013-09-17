var Cell = function(x, y) {
  this.x = x;
  this.y = y;
}

Cell.prototype = {
  getKey: function() {
    return this.x + '-' + this.y;
  }
}
