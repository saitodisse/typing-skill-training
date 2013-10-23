;(function($){
  "use strict";
  var eventTarget,
      SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13],
      tid,
      index = 0,
      start;

  $.fn.konami = function(){
    eventTarget = this;
    return this.data("konami", createKonami(this).init());
  };
  $.fn.konami.off = function(){
    clearInterval(tid);
    eventTarget.trigger("konami.disabled");
    eventTarget.off("keyup", keyUpKonami);
  };

  var init = function(){
    enablePlugin();
    return this;
  };

  function createKonami(container){
    var me = {
      container: container,
      init: init
    };

    return me;
  }

  var enablePlugin = function(){
    eventTarget.trigger("konami.enabled");
    eventTarget.on("keyup", keyUpKonami);
  };
  var keyUpKonami = function(event){
    checkKonamiCode(event.which);
  };

  var failKonami = function(){
    index = 0;
    clearInterval(tid);
    eventTarget.trigger("konami.fail");
  };

  var checkKonamiCode = function(key){
    if(index === 0){
      start = new Date();
    }

    clearInterval(tid);
    var isCorret = SEQUENCE[index] === key;

    if(isCorret){
      index++;
      tid = setTimeout(failKonami, 1000);
    }
    else{
      return failKonami();
    }

    if(index === SEQUENCE.length){
      return function(){
        index = 0;
        clearInterval(tid);
        eventTarget.trigger("konami.success", {executedTime : new Date() - start });
      }();
    }

    eventTarget.trigger("konami.progress",
      { expected: SEQUENCE[index-1],
        received: key,
        index: index
      });
  };



})(jQuery, window);
