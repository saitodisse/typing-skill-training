;(function($) {
  $.extend($.fn, {
      typingSkillTraining: function(param, options) {
          options = $.extend({
              SEQUENCE: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13] // default KONAMI sequence
            , disableFunction: undefined
          }, options);

          this.each(function() {
              var tid         //setTimeout ID
                , index = 0   //global index
                , start       //Date() when user starts to type
                , current = $(this)
              ;

              var enable = function(){
                  // attach keyup event
                  current.on("keyup", keyup);
                  current.trigger("typingSkillTraining.enabled");
              };

              var disable = function(){
                  // attach keyup event
                  current.off("keyup", keyup);
                  current.trigger("typingSkillTraining.disabled");
              };

              // private methods
              var keyup = function(event){
                current.trigger("typingSkillTraining.keyup", {which : event.which});
                checkTypingSkillTrainingCode(event.which);
              };

              var failTypingSkillTraining = function(){
                index = 0;
                clearInterval(tid);
                current.trigger("typingSkillTraining.fail");
              };

              var checkTypingSkillTrainingCode = function(key){
                if(index === 0){
                  start = new Date();
                }

                clearInterval(tid);
                var isCorret = options.SEQUENCE[index] === key;

                if(isCorret){
                  index++;
                  tid = setTimeout(failTypingSkillTraining, 1000);
                }
                else{
                  return failTypingSkillTraining();
                }

                if(index === options.SEQUENCE.length){
                  return function(){
                    index = 0;
                    clearInterval(tid);
                    current.trigger("typingSkillTraining.success", {executedTime : new Date() - start });
                  }();
                }

                current.trigger("typingSkillTraining.progress",
                  { expected: options.SEQUENCE[index-1],
                    received: key,
                    index: index
                  });
              };

              enable();
              options.disableFunction = disable;

          }).data('typingSkillTraining', {
              off: options.disableFunction
          });

          return this;
      }
  });
})(jQuery);
