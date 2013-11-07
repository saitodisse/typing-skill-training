;(function(global){
  global.Sandbox = {};

  Sandbox.init = function(page){
    this.target = new Sandbox.Target($(global));
    this.target.initTypingComponent();

    this.page = $(page);
    this.loading = new Sandbox.Loading(this.page.find(".loading"));
    this.container = new Sandbox.Container(this.page.find(".container"));

    this.loading.hide().done(function(){
      this.container.show();
    }.bind(this))
  }
}(window));
