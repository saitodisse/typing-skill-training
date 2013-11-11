;(function(ns){
  ns.Panel = function(html){
    this.html = html;
    this.lastTimeSpan = $(".lastTimeSpan");

    this.init = function(){
      this.lastTimeSpan.text("0.000 seconds");
    }
  }
}(Sandbox));
