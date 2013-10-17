;(function($, window){
  "use strict";
  var window = $(window);

  $.Konami = function(){
    var SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
    var errorKeyList = [];
    var expectedSeq = [];
    var index = 0;

    this.checkKonamiCode = function(key){
      var isCorret = SEQUENCE[index] === key;

      if(isCorret){
        errorKeyList = [];
        index++;
      }
      else{
        index = 0;
        errorKeyList.push(key);
        window.trigger("konami.fail", { keys: errorKeyList });
      }

      if(index === SEQUENCE.length){
        index = 0;
        window.trigger("konami.success", { keys: SEQUENCE });
      }
      else{
        window.trigger("konami.progress",
          { expected: SEQUENCE[index-1],
            received: key,
            index: index,
            isCorret: isCorret
          });
      }
    };
  };
})(jQuery, window);
