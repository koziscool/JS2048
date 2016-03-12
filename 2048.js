

var Two048Model = {
  numTiles: 16,
  numRows: 4,
  numCols: 4,
  initialSquares: 2,
  probabilityNewTwo: 0.9,

  tileValues: ['blank','2','4','8','16', '32', '64', '128', '256', '512', '1024', '2048', '4096', '8192', '16384' ],
  tiles: {},

  gameScore: 0,

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
        // square = new this.Square(i, j, 'blank');
        this.setTile( i, j, 'blank' );
      }
    }

    for( var i = 0; i < this.initialSquares; i++ ){
      this.addNewSquare();
    }    
  },

  getEmptySquares: function() {
    emptySquares = [];
    for( var i = 0; i < this.numRows; i++ ){
      for( var j = 0; j < this.numCols; j++ ) {
        if( this.getTile(i, j) === 'blank' ) {
          emptySquares.push( this.tileKey(i, j) );
        }
      }
    }
    return emptySquares;
  },

  addNewSquare: function() {
    var empties = this.getEmptySquares();
    var randomEmpty = empties[ Math.floor(Math.random() * empties.length) ];
    var row = randomEmpty.split(",")[0];
    var col = randomEmpty.split(",")[1];
    this.setTile( row, col, this.randomNewValue() );
  },

  moveUp: function( ) {
    for (var col = 0; col < this.numCols; col++ ){
      values = [];
      for (var row = 0; row < this.numCols; row++ ){
        values.push( this.getTile( row,  col) );
      }

      values = this.stripBlanks( values )
      this.collapseArray( values )

      for (var row = 0; row < this.numCols; row++ ){
        if( values[row] ) {  
          this.setTile( row,  col, values[row] );
        } else {
          this.setTile( row,  col, 'blank' );
        }
      }
    }
    this.addNewSquare();
  },

  moveDown: function( ) {
    console.log('move down');
    for (var col = 0; col < this.numCols; col++ ){
      values = [];
      for (var row = this.numCols  - 1; row >= 0; row-- ){
        values.push( this.getTile( row,  col) );
      }

      values = this.stripBlanks( values )
      this.collapseArray( values )

      for (var row = this.numRows - 1; row >= 0; row-- ){
        if( values[this.numRows - 1 - row] ) {  
          this.setTile( row,  col, values[ this.numRows - 1 - row]  );
        } else {
          this.setTile( row,  col, 'blank' );
        }
      }
    }
    this.addNewSquare();
  },

  moveLeft: function( ) {
    for (var row = 0; row < this.numRows; row++ ){
      values = [];
      for (var col = 0; col < this.numCols; col++ ){
        values.push( this.getTile( row,  col) );
      }

      values = this.stripBlanks( values )
      this.collapseArray( values )

      for (var col = 0; col < this.numCols; col++ ){
        if( values[col] ) {  
          this.setTile( row,  col, values[col] );
        } else {
          this.setTile( row,  col, 'blank' );
        }
      }
    }

    this.addNewSquare();
  },

  moveRight: function( ) {
    for (var row = 0; row < this.numRows; row++ ){
      values = [];
      for (var col = this.numCols - 1; col >= 0; col-- ){
        values.push( this.getTile( row,  col) );
      }

      values = this.stripBlanks( values )
      this.collapseArray( values )

      for (var col = this.numCols - 1; col >= 0; col-- ){
        if( values[this.numCols - 1 - col] ) {  
          this.setTile( row,  col, values[this.numCols - 1 - col] );
        } else {
          this.setTile( row,  col, 'blank' );
        }
      }
    }

    this.addNewSquare();
  },

////////

  notABlank: function( elt ) { 
    var retVal = ( elt != 'blank');
    return retVal; 
  },

  stripBlanks: function( arr ) {
    retArray = []
    arr.forEach( function(elt) {
      if (elt !== 'blank') {
        retArray.push(elt)
      }
    });
    return retArray;
  },

  collapseArray: function( arr ){
    for ( var i = 0;  i < arr.length - 1 ; i++ ) {

      if ( arr[i] === 'blank' ) {
        arr[i] = arr[ i+1 ];
        arr[i+1] = 'blank';
      }

      if ( arr[i] === arr[i+1] ) {
        var newVal = 2 * (+arr[i]);
        arr[i] = newVal.toString();
        this.gameScore += newVal;
        arr[i+1] = 'blank';
      }
    }
  },

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
    switch ( direction ) {
      case 'left': // Left
        this.model.moveLeft();
        break;

      case 'up': // Up
        this.model.moveUp();
        break;

      case 'right': // Right
        this.model.moveRight();
        break;

      case 'down': // Down
        this.model.moveDown();
        break;
    }
    this.view.render();
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
