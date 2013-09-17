(function() {

function expectLiving(game, cell) {
  expect(game.getLivingCells()[cell]).toBeDefined();
}
function expectDead(game, cell) {
  expect(game.getLivingCells()[cell]).toBeUndefined();
}

function expectGame(game) {
  var cells = game.getLivingCells();
  for (var i = arguments.length - 1; i >= 1; i--) {
    expect(cells[arguments[i]]).toBeDefined();
  };
  //console.log(cells, Object.keys(cells));
  expect(Object.keys(cells).length).toEqual(arguments.length - 1);
}

describe("An empty game", function() {
  it("remains empty after one tick", function() {
  	var game = new Game();
  	game.tick();
    expectGame(game);
  });
});

describe("A game with one living cell", function() {
  var game = new Game();
  it("can represent its state", function() {
    game.createCell(1, 1);
  	expect(game.getLivingCells()).toEqual( { "1-1" : new Cell(1, 1) });
  });
  it("becomes empty after one tick", function() {
  	game.tick();
    expectGame(game);
  });
});

describe("A game with two living cells neighbouring each other", function() {
  var game = new Game();
  it("becomes empty after one tick", function() {
    game.tick();
    expectGame(game);
  });
});
describe("A game with three living cells neighbouring each other", function() {
  var game = new Game();
  game.createCell(0, 0);
  game.createCell(1, 1);
  game.createCell(2, 2);
  
  it("contains only the middle cell after one tick", function() {
    game.tick();
    expectGame(game, "1-1");
  });
});
describe("A game with four living cells neighbouring each other", function() {
  var game = new Game();
  game.createCell(0, 0);
  game.createCell(0, 1);
  game.createCell(0, 2);
  game.createCell(1, 1);

  it("contains only the middle cell after one tick", function() {
    game.tick();
    expectLiving(game, "0-1");
  });
});
describe("A game with a cell with four neighbours", function() {
  var game = new Game();
  game.createCell(1, 1);
  game.createCell(1, 2);
  game.createCell(1, 3);
  game.createCell(2, 2);
  game.createCell(0, 2);
  
  it("has the middle cell dead after one tick", function() {
    game.tick();
    expectDead(game, "1-2");
  });
});
describe("A game with three cells around a dead one", function() {
  var game = new Game();
  game.createCell(1, 1);
  game.createCell(1, 3);
  game.createCell(2, 2);
  
  it("contains the dead cell resurrected after one tick", function() {
    game.tick();
    expectLiving(game, "1-2");
  });
});
describe("A display registered on a game", function() {
  var game = new Game();
  game.createCell(1, 1);
  game.createCell(2, 2);
  game.createCell(3, 3);
  var display = jasmine.createSpy('display');
  game.onAfterTick(display);

  it("will be notified when a tick occured", function() {
    game.tick();
    expect(display).toHaveBeenCalledWith([new Cell(2, 2)]);
    expect(display.call.length).toEqual(1);
  });
});

})();

