;(function($){
  "use strict";
  $.fn.konami = function(options){
    var defaults = {
                // default KONAMI sequence
      SEQUENCE: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13],
      eventTarget: $(this)
    };

    var options = $.extend(defaults, options);

    return this.each(function() {
      //references konami on 'me' for konami.off
      createKonami(options).init();
    });
  };

  var createKonami = function (options){
    var tid,       //setTimeout ID
        index = 0, //global index
        start;     //Date() when user starts to type

    $.fn.konami.off = function(){
      console.log(options.eventTarget)
      clearInterval(tid);
      options.eventTarget.trigger("konami.disabled");
      options.eventTarget.off("keyup", keyup);
    };

    // private methods
    var keyup = function(event){
      console.log("==> keyup: ", options, event)

      options.eventTarget.trigger("konami.keyup", {which : event.which});
      checkKonamiCode(event.which);
    };

    var enable = function(){
        // attach keyup event
        options.eventTarget.on("keyup", keyup);
        options.eventTarget.trigger("konami.enabled");
    };

    var failKonami = function(){
      index = 0;
      clearInterval(tid);
      options.eventTarget.trigger("konami.fail");
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
          options.eventTarget.trigger("konami.success", {executedTime : new Date() - start });
        }();
      }

      options.eventTarget.trigger("konami.progress",
        { expected: options.SEQUENCE[index-1],
          received: key,
          index: index
        });
    };

    return {
      // public methods
      init: function(){
        enable();
      }
    };
  }

})(jQuery, window);
