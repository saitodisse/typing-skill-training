;(function($, window){
  "use strict";
  var target = $(window),
      SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13],
      tid,
      index = 0;

  var failKonami = function(){
    index = 0;
    clearInterval(tid);
    target.trigger("konami.fail");
  };

  var checkKonamiCode = function(key){
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
        target.trigger("konami.success");
      }();
    }

    target.trigger("konami.progress",
      { expected: SEQUENCE[index-1],
        received: key,
        index: index
      });
  };

  var keyUpKonami = function(event){
    checkKonamiCode(event.which);
  };

  $.konami = function(){
    console.log('enabling konami...');
    target.trigger("konami.enabled");
    target.on("keyup", keyUpKonami);
  };

  $.konami.off = function(){
    console.log('disabling konami...');
    clearInterval(tid);
    target.trigger("konami.disabled");
    target.off("keyup", keyUpKonami);
  };

})(jQuery, window);
