;(function(global){
  global.Sandbox = {};

  Sandbox.init = function(page){
    this.page = $(page);
    this.panel = new Sandbox.Panel(this.page.find(".panel"));

    this.target = new Sandbox.Target($(global));
    this.target.initTypingComponent({
        panel: this.panel.html
    });

    this.loading = new Sandbox.Loading(this.page.find(".loading"));
    this.container = new Sandbox.Container(this.page.find(".container"));

    this.loading.hide().done(function(){
      this.container.show();
    }.bind(this))
  }
}(window));
