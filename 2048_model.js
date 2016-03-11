


var Two048Model = {
  numTiles: 16,
  numRows: 4,
  numCols: 4,

  tileValues: ['blank','2','4','8','16', '32', '64', '128', '256', '512', '1024', '2048', '4096', '8192', '16384' ],
  tiles: {},

  score: 0,

  init: function() {
    this.buildGrid();
  },

  buildGrid: function() {
    for( var i = 0; i < this.numRows; i++ ){
      for( var j = 0; j < this.numCols; j++ ) {
        this.addToGrid( i, j, 'blank' );
      }
    }

  },

  addToGrid: function(row, col, value) {
    this.tiles[row.toString() + ',' + col.toString()] = value;
  },

  getFromGrid: function(x, y) {
    return this.tiles[x.toString() + ',' + y.toString()];
  },



};