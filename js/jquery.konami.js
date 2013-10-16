;(function($, target){
  $.fn.konami = function(){
    var SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
    var newSeq = [];
    var expectedSeq = [];
    var actualIndice = 0;

    var initializeNewSeq = function initializeNewSeq(){
      expectedSeq = [];
      for (var i = 0; i <= SEQUENCE.length; i++) {
        expectedSeq.push(SEQUENCE[i]);
      };
    }

    $(target).on("keyup", function(event){
      newSeq.push(event.which);

      var lastSEQindex = SEQUENCE.length - 1;
      if(actualIndice === lastSEQindex){
        console.log("you did it!", newSeq);
        newSeq = [];
        actualIndice = 0;
      }

      if(SEQUENCE[actualIndice] !== newSeq[actualIndice]){
        console.log("wrong", newSeq);
        newSeq = [];
        actualIndice = 0;
      }
      else {
        if(actualIndice > 0){
          console.log("keep going...", newSeq);
        }
        actualIndice++;
      }

    });

    return this;
  }
})(jQuery, window);
