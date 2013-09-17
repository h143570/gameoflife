var Game = (function() {

  var Game = function() {
    this.cells = {};
    this.listeners = {
      onAfterCreateCell: function() {},
      onAfterTick: function() {},
    };
  }
  Game.prototype = {
  	tick: function() {
      function shouldLive(cell) {
        var count = CellUtils.countNeighbours(this.cells, cell);
        return count >= 2 && count <= 3;
      }
      function shouldResurrect(cell) {
        var count = CellUtils.countNeighbours(this.cells, cell);
        return count == 3;
      }
      var livings = {};
      for(var key in this.cells) {
        if (shouldLive.call(this, this.cells[key])) {
          livings[key] = this.cells[key];
        }
      }
      var deads = CellUtils.getDeadNeighbours(this.cells);
      for(var key in deads) {
        if (shouldResurrect.call(this, deads[key])) {
          livings[key] = deads[key];
        }
      }
      this.cells = livings;
      this.listeners.onAfterTick(Object.keys(this.cells).map(function(key){return this.cells[key]}, this));
    },

    getLivingCells: function() {
      return this.cells;
    },

    createCell: function(x, y) {
      var cell = new Cell(x, y);
      this.cells[cell.getKey()] = cell;
      this.listeners.onAfterCreateCell(Object.keys(this.cells).map(function(key){return this.cells[key]}, this));
    },

    onAfterCreateCell: function(callback) {
      this.listeners.onAfterCreateCell = callback;
    },
    onAfterTick: function(callback) {
      this.listeners.onAfterTick = callback;
    }
  }
  return Game;
})();