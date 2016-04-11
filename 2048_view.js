

var Two048view = {



  init: function() {
    this.$grid = $('#2048-grid');
    this.render();
  },

  render: function() {
    this.addTilesToGrid();
  },



  addTilesToGrid: function() {
    this.$grid.html("");
    for( var i = 0; i < Two048Controller.numRows; i++ ) {
      for( var j = 0; j < Two048Controller.numCols; j++ ) {

        var tile = Two048Controller.model.getTile( i, j);
        var $tileDiv = $("<div><div class='tile-value'>" + tile + "</div></div>");
        $tileDiv.addClass('tile');
        $tileDiv.addClass( 'tile-' + tile);

        $tileDiv.attr( 'row', i );
        $tileDiv.attr( 'col', j );
        this.$grid.append($tileDiv);
      }
    }
  },



  updateGameView: function( ) {
    // var $gameState = $('#game-state-text');
    // $gameState.text( this.model.gameStateText );

    // var $numGuesses = $('#num-guesses');
    // $numGuesses.text(this.model.numGuesses );

    // var $totalCards = $('#total-cards');
    // $totalCards.text(this.model.totalCards );

    // var $matchedCards = $('#matched-cards');
    // $matchedCards.text(this.model.matchedCards );
  }

};
