;(function($) {
  $.extend($.fn, {
      typingSkillTraining: function(options) {
          options = $.extend({
              SEQUENCE: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13] // default KONAMI sequence
            
            // for post reference. 
            // Use like that: $(element).data("typingSkillTraining").off();
            , disableFunction: undefined
            
            //API Events
            , onEnable: undefined
            , onDisable: undefined
            , onKeyup: undefined
            , onFail: undefined
            , onSuccess: undefined
            , onProgress: undefined
          }, options);

          this.each(function() {
              var tid         //setTimeout ID
                , index = 0   //global index
                , start       //Date() when user starts to type
                , current = $(this)
                , keyPressed
              ;

              var attachExternalEvent = function(eventCallback){
                  if(eventCallback !== undefined && $.isFunction(eventCallback)){
                    var args = [].splice.call(arguments,0);
                    eventCallback.apply(null, args.splice(1));
                  }
              }

              var enable = function(){
                  // attach keyup event
                  current.on("keyup", keyup);
                  attachExternalEvent(options.onEnable);
              };

              var disable = function(){
                  // attach keyup event
                  current.off("keyup", keyup);
                  attachExternalEvent(options.onDisable);
              };

              // private methods
              var keyup = function(event){
                keyPressed = event.which;
                attachExternalEvent(options.onKeyup, { which : keyPressed });
                checkTypingSkillTrainingCode();
              };

              var failTypingSkillTraining = function(){
                attachExternalEvent(options.onProgress, {
                    expected: options.SEQUENCE[index-1],
                    key: keyPressed,
                    index: index,
                    status: "fail"
                  }
                );

                attachExternalEvent(options.onFail);

                clearInterval(tid);
                index = 0;
              };

              var checkTypingSkillTrainingCode = function(){
                if(index === 0){
                  start = new Date();
                }

                clearInterval(tid);
                var isCorret = options.SEQUENCE[index] === keyPressed;

                if(isCorret){
                  index++;
                  tid = setTimeout(failTypingSkillTraining, 1000);
                }
                else{
                  return failTypingSkillTraining();
                }

                if(index === options.SEQUENCE.length){
                  attachExternalEvent(options.onProgress, {
                      expected: options.SEQUENCE[index-1],
                      received: keyPressed,
                      index: index,
                      status: "success"
                    }
                  );
  
                  return function(){
                    index = 0;
                    clearInterval(tid);
                    attachExternalEvent(options.onSuccess, {executedTime : new Date() - start })
                  }();
                }

                attachExternalEvent(options.onProgress, {
                    expected: options.SEQUENCE[index-1],
                    received: keyPressed,
                    index: index,
                    status: "inProgress"
                  }
                );
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
