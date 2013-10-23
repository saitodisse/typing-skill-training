;(function($){
  "use strict";
  var me,
      eventTarget,
      DEFAULT_KONAMI_SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];

  $.fn.konami = function(options){
    var defaults = {
      SEQUENCE: DEFAULT_KONAMI_SEQUENCE
    };

    var options = $.extend(defaults, options);

    eventTarget = this;

    return this.each(function() {
      me = createKonami(options).init();
    });
  };
  $.fn.konami.off = function(){
    me.disable();
  };

  function createKonami(options){
    var  tid,
         index = 0,
         start;

    // private methods
    var keyup = function(event){
      eventTarget.trigger("konami.keyup", {which : event.which});
      checkKonamiCode(event.which);
    };

    var enable = function(){
        eventTarget.trigger("konami.enabled");
        eventTarget.on("keyup", keyup);
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
      var isCorret = options.SEQUENCE[index] === key;

      if(isCorret){
        index++;
        tid = setTimeout(failKonami, 1000);
      }
      else{
        return failKonami();
      }

      if(index === options.SEQUENCE.length){
        return function(){
          index = 0;
          clearInterval(tid);
          eventTarget.trigger("konami.success", {executedTime : new Date() - start });
        }();
      }

      eventTarget.trigger("konami.progress",
        { expected: options.SEQUENCE[index-1],
          received: key,
          index: index
        });
    };

    return {
      // public methods
      init: function(){
        enable();
        return this;
      },
      disable: function(){
        clearInterval(tid);
        eventTarget.trigger("konami.disabled");
        eventTarget.off("keyup", me.keyup);
      }
    };
  }

})(jQuery, window);
