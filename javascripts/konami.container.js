;(function(ns){
  ns.Container = function(html){
    this.html = html;

    this.show = function(){
      return this.html.fadeIn().promise();
    }
  }
}(Konami));
