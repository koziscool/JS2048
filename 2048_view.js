

var 2048View = {

  init: function() {
    this.$grid = $('#matcher-grid');
    this.render();
  },

  render: function() {
    this.addCardsToGrid();
    var width = 100.0 / this.model.size - 2;
    $('.card').css({
      width: width + "%"
    });

  },


  addCardsToGrid: function() {
    for( var i = 0; i < this.model.cards.length; i++ ) {
      var card = this.model.cards[i];
      var $cardDiv = $("<div> <div class='name'>" + card.value.toString() + "</div></div>");
      $cardDiv.addClass('card');
      $cardDiv.data( 'card-id', card.id );
      $cardDiv.attr( 'id', 'card-' + card.id );
      this.$grid.append($cardDiv);
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