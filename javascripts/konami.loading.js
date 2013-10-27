;(function(ns){
  ns.Loading = function(html){
    this.html = html;

    this.hide = function(){
      return this.html.fadeOut().promise();
    }
  }
}(Konami));
