function addCell(cells, x, y) {
  var cell = new Cell(x, y);
  cells[cell.getKey()] = cell;
}

describe("CellUtils.getDeadNeighbours", function() {
  it("should return neighbouring dead cells around a single living cell", function() {
    var cells = {};
    addCell(cells, 1, 1);
    var deads = CellUtils.getDeadNeighbours(cells);
    var keys = Object.keys(deads);
    expect(keys.length).toEqual(8);
    expect(keys).toContain('0-0');
    expect(keys).toContain('0-1');
    expect(keys).toContain('0-2');
    expect(keys).toContain('1-0');
    expect(keys).toContain('1-2');
    expect(keys).toContain('2-0');
    expect(keys).toContain('2-1');
    expect(keys).toContain('2-2');
  });
  it("should return neighbouring dead cells around a two neighbouring living cells", function() {
    var cells = {};
    addCell(cells, 1, 1);
    addCell(cells, 1, 2);
    var deads = CellUtils.getDeadNeighbours(cells);
    var keys = Object.keys(deads);
    expect(keys.length).toEqual(10);
    expect(keys).toContain('0-0');
    expect(keys).toContain('0-1');
    expect(keys).toContain('0-2');
    expect(keys).toContain('0-3');
    expect(keys).toContain('1-0');
    expect(keys).toContain('1-3');
    expect(keys).toContain('2-0');
    expect(keys).toContain('2-1');
    expect(keys).toContain('2-2');
    expect(keys).toContain('2-3');
  });
});
describe("CellUtils.countNeighbours", function() {
  it("should return neighbouring living cells around the cell", function() {
    var cells = {};
    addCell(cells, 1, 1);
    addCell(cells, 1, 2);
    addCell(cells, 1, 3);
    addCell(cells, 2, 2);
    expect(CellUtils.countNeighbours(cells, new Cell(1, 2))).toEqual(3);
  });
});