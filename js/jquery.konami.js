;(function($, target){
  "use strict";

  $.konami = function(){
    var SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
    var newSeq = [];
    var expectedSeq = [];
    var actualIndice = 0;

    var initializeNewSeq = function(){
      expectedSeq = [];
      for (var i = 0; i <= SEQUENCE.length; i++) {
        expectedSeq.push(SEQUENCE[i]);
      }
    };

    var checkKonamiCode = function(key){
      newSeq.push(key);
      var sameArrayUntiNow = SEQUENCE[actualIndice] === newSeq[actualIndice];
      var lastSEQindex = SEQUENCE.length - 1;

      if(!sameArrayUntiNow){
        $(target).trigger("konami.fail", {keys: newSeq});
        newSeq = [];
        newSeq.push(key);
        actualIndice = 0;
      }

      if(actualIndice === lastSEQindex){
        $(target).trigger("konami.success", {keys: newSeq});
        newSeq = [];
        actualIndice = 0;
      }
      else{
        $(target).trigger("konami.progress", {keys: newSeq});
        actualIndice++;
      }

    };

    $(target).on("keyup", function(event){
      checkKonamiCode(event.which);
    });
  };
})(jQuery, window);
