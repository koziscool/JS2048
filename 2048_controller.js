


var 2048Controller = {
  model: 2048model,
  view: 2048view,


  init: function(size) {
    this.model.init(size);
    this.view.init();
  },

};