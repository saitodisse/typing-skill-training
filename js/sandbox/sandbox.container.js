;(function(ns){
  ns.Container = function(html){
    this.html = html;

    this.show = function(){
      this.html.removeClass('hidden');
      return this.html.fadeIn().promise();
    }
  }
}(Sandbox));
