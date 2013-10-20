;(function($, window){
  "use strict";
  var window = $(window);

  $.Konami = function(){
    var SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
    var seq = [];
    var errorKeyList = [];
    var index = 0;

    this.compareArray = function (arr1, arr2){
      if(arr1.length !== arr2.length){
        return false;
      }

      for (var i = arr1.length - 1; i >= 0; i--) {
        if(arr1[i] !== arr2[i]){
          return false;
        }
      };
      return true;
    }

    this.trimStart = function (arr1, arr2){
      var arr2Bkp = arr2;
      for (var i = arr1.length - 1; i >= 0; i--) {
        arr2 = arr2.slice(1, arr2.length);
        if(this.compareArray(arr1, arr2)){
          return arr2;
        }
      };
      return [];
    }


    this.checkKonamiCode = function(key){
      var isCorret = SEQUENCE[index] === key;

      // incorrect ===> !isCorret
      /*
        38, 38, 40
        38, 38, 38, 40
                ^
        0   1   2   3

        index -= 1;
        remove first from seq
      */

      if(!isCorret){
        var SEQ_partial = SEQUENCE.slice(0,index)
        seq.push(key);
        var new_seq = this.trimStart(SEQ_partial, seq);

        if(!this.compareArray(seq, new_seq)){
          seq = new_seq.slice(1, new_seq.length);
          index = seq.length - 1;

          if(index >= 0){
            isCorret = true;
          }
        }
      }

      if(isCorret){
        errorKeyList = [];
        index++;
        seq.push(key);
      }
      else{
        index = 0;
        seq = [];
        errorKeyList.push(key);
        window.trigger("konami.fail", { keys: errorKeyList });
      }

      if(this.compareArray(seq, SEQUENCE)){
        index = 0;
        seq = [];
        window.trigger("konami.success", { keys: SEQUENCE });
      }
      else{
        window.trigger("konami.progress",
          { expected: SEQUENCE[index-1],
            received: key,
            index: index,
            seq: seq,
            isCorret: isCorret
          });
      }
    };
  };
})(jQuery, window);
