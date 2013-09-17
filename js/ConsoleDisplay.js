var ConsoleDisplay = (function() {
  var ConsoleDisplay = function() {
  }

  ConsoleDisplay.prototype = {
    render: function(cells) {
      var boundaries = CellUtils.getBoundaries(cells);
      var grid = [];
      for(var y = boundaries.min.y; y <= boundaries.max.y; y++) {
        var row = [];
        for(var x = boundaries.min.x; x <= boundaries.max.x; x++) {
          row.push(' ');
        }
        grid.push(row);
      }
      cells.forEach(function(cell) {
        grid[cell.y][cell.x] = '0';
      });
      grid = grid.map(function(row) {return row.join('')});
      console.log('\n' + grid.join('\n'));
    }
  }
  return ConsoleDisplay;
})();