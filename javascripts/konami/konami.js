;(function(global){
  global.Konami = {};

  Konami.init = function(page){
    this.target = new Konami.Target($(global));
    this.target.initTypingComponent();

    this.page = $(page);
    this.container = new Konami.Container(this.page.find(".container"));
    this.loading = new Konami.Loading(this.page.find(".loading"));

    var hidden = this.loading.hide();

    //external dependencies
    $('#main_content').headsmart();

    hidden.done(function(){
      this.container.show();
    }.bind(this))
  }
}(window));
