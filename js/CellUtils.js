var CellUtils = (function() {
  var utils = {};

  var NB_OFFSETS = [
  {x: -1, y: -1}, {x: -1, y: 0}, {x: -1, y: 1},
  {x: 0, y: -1}, {x: 0, y: 1},
  {x: 1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}
  ];
  utils.countNeighbours = function(cells, cell) {
    return NB_OFFSETS.reduce(function(count, offset) { 
      return count + (cells[new Cell(cell.x + offset.x, cell.y + offset.y).getKey()] ? 1 : 0);
    }, 0);
  }
  utils.getDeadNeighbours = function(cells) {
    var deads = {};
    for (var key in cells) {
      var cell = cells[key];
      NB_OFFSETS.forEach(function(offset) {
        var dead = new Cell(cell.x + offset.x, cell.y + offset.y);
        if (!cells[dead.getKey()]) {
          deads[dead.getKey()] = dead;
        }
      });
    }
    utils.getBoundaries = function(cells) {
      return cells.reduce(function(b, cell) {
          if (b.min.x > cell.x) {
            b.min.x = cell.x;
          }
          if (b.min.y > cell.y) {
            b.min.y = cell.y;
          }
          if (b.max.x < cell.x) {
            b.max.x = cell.x;
          }
          if (b.max.y < cell.y) {
            b.max.y = cell.y;
          }
          return b;
        }, {min:{x:0, y:0}, max:{x:0, y:0}});
    }
    return deads;
  }
  return utils;
})();