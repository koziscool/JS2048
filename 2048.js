
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

};

$(document).ready(function() {
  Two048Controller.init();
});
