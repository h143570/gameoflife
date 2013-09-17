describe("A display", function() {
  var display = new ConsoleDisplay();
  it("can render a grid with a cell", function() {
    var cells = [new Cell(1, 1)];
    display.render(cells);
  });
  it("can render a grid with multiple cells", function() {
    var cells = [new Cell(1,1), new Cell(2,1), new Cell(1,2)];
    display.render(cells);
  });
});

describe("A display integrated with a game", function() {
  var display = new ConsoleDisplay();
  var game = new Game();
  game.onAfterTick(display.render);
  //game.onAfterCreateCell(display.render);

  it("can render a grid with multiple cells", function() {
    console.log('glider commencing...')
    game.createCell(1, 0);
    game.createCell(2, 1);
    game.createCell(0, 2);
    game.createCell(1, 2);
    game.createCell(2, 2);
    for(var i = 0; i < 10; i++) {
      game.tick();
    }
  });
});
