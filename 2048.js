


var Two048Model = {
  numTiles: 16,
  numRows: 4,
  numCols: 4,
  initialSquares: 2,
  probabilityNewTwo: 0.9,

  tileValues: ['blank','2','4','8','16', '32', '64', '128', '256', '512', '1024', '2048', '4096', '8192', '16384' ],
  tiles: {},

  score: 0,

  init: function() {
    this.buildInitialGrid();
  },

  tileKey: function(row, col) {
    return row.toString() + ',' + col.toString();
  },

  setTile: function(row, col, value) {
    this.tiles[ this.tileKey(row, col) ] = value;
  },

  getTile: function(x, y) {
    return this.tiles[ this.tileKey(x, y) ];
  },

  randomNewValue: function() {
    if ( Math.random() < this.probabilityNewTwo ) {
      return '2';
    }
    else {
      return '4';
    }
  },

  buildInitialGrid: function() {
    for( var i = 0; i < this.numRows; i++ ){
      for( var j = 0; j < this.numCols; j++ ) {
        square = new this.Square(i, j, 'blank');
        this.setTile( i, j, square );
      }
    }

    for( var i = 0; i < this.initialSquares; i++ ){
      var empties = this.getEmptySquares();
      var randomEmpty = empties[ Math.floor(Math.random() * empties.length) ];
      randomEmpty.value = this.randomNewValue();
    }    
  },

  getEmptySquares: function() {

    emptySquares = [];
    for( var i = 0; i < this.numRows; i++ ){
      for( var j = 0; j < this.numCols; j++ ) {
        var tile = this.getTile(i, j);
        if( tile.value === 'blank' ) {
          emptySquares.push( tile );
        }
      }
    }
    return emptySquares;
  },

  Square: function(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
  },

  setDirection: function( direction ) {
    
  }

};

var Two048Controller = {
  model: Two048Model,

  numTiles: Two048Model.numTiles,
  numRows: Two048Model.numRows,
  numCols: Two048Model.numCols,

  view: Two048view,


  init: function() {
    this.model.init();
    this.view.init();
  },

  setDirection: function(direction) {
    model.setDirection(direction);
    view.render();
  },

};

$(document).ready(function() {
  Two048Controller.init();

  window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 37: // Left
        Two048Controller.setDirection('left');
        break;

      case 38: // Up
        Two048Controller.setDirection('up');
        break;

      case 39: // Right
        Two048Controller.setDirection('right');
        break;

      case 40: // Down
        Two048Controller.setDirection('down');
        break;
    }
  }, false);

});
