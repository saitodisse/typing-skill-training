;(function($) {
  $.extend($.fn, {
      typingSkillTraining: function(options) {
          options = $.extend({
              // default KONAMI sequence
              sequence: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13] 
            
              // for latter reference. 
              // Use like that: $(element).data("typingSkillTraining").off();
            , disableFunction: undefined
            
              //API Events
            , onEnable: undefined
            , onDisable: undefined
            , onKeyup: undefined
            , onFail: undefined
            , onSuccess: undefined
            , onProgress: undefined
            , panel: undefined
          }, options);

          this.each(function() {
            var tid         //setTimeout ID
              , index = 0   //global index
              , start       //Date() when user starts to type
              , current = $(this)
              , keyPressed
              , panel

                // private methods
                // ---------------
              , triggerEvent = function(eventCallback){
                  if(eventCallback !== undefined && $.isFunction(eventCallback)){
                    var args = [].splice.call(arguments,0);
                    eventCallback.apply(null, args.splice(1));
                  }
                }

              , enable = function(){
                  // attach key-up event
                  current.on("keyup", keyup);
                  triggerEvent(options.onEnable);
                }

              , disable = function(){
                  // remove key-up event
                  current.off("keyup", keyup);
                  triggerEvent(options.onDisable);
                }

              , keyup = function(event){
                  keyPressed = event.which;
                  triggerEvent(options.onKeyup, { which : keyPressed });
                  checkTypingSkillTrainingCode();
                }

              , failTypingSkillTraining = function(){
                  triggerEvent(options.onProgress, {
                      expected: options.sequence[index-1],
                      key: keyPressed,
                      index: index+1,
                      status: "fail"
                    }
                  );

                  triggerEvent(options.onFail);

                  // resets counter and intervals
                  clearInterval(tid);
                  index = 0;
                }

                // checkTypingSkillTrainingCode : main function
                // --------------------------------------------
                // verifies if the sequence is correct or fails
              , checkTypingSkillTrainingCode = function(){
                  
                  // if was the first key pressed
                  // then starts to measure time
                  if(index === 0){
                    start = new Date();
                  }

                  // resets fail timeout
                  clearInterval(tid);

                  var isCorret = options.sequence[index] === keyPressed;

                  if(isCorret){
                    // go to the next expected key
                    index++;

                    // sets fail timeout
                    tid = setTimeout(failTypingSkillTraining, 1000);
                  }
                  else{
                    // FAIL
                    // ----
                    return failTypingSkillTraining();
                  }

                  // SUCCESS
                  // -------
                  // all keys was pressed correctly
                  if(index === options.sequence.length){
                    triggerEvent(options.onProgress, {
                        //because index was already incremented
                        expected: options.sequence[index-1],
                        received: keyPressed,
                        index: index,
                        status: "success"
                      }
                    );
    
                    // resets counter and intervals
                    index = 0;
                    clearInterval(tid);

                    triggerEvent(options.onSuccess, {
                      executedTime : new Date() - start
                    });

                    return;
                  }

                  // ON PROGRESS
                  // -----------
                  triggerEvent(options.onProgress, {
                      expected: options.sequence[index-1],
                      received: keyPressed,
                      index: index,
                      status: "inProgress"
                    }
                  );
                }
            ;

            enable();
            
            // references disable on options object
            options.disableFunction = disable;

            if(options.panel !== undefined){
              options.panel.find(".lastTimeSpan").text("0.000 seconds");
            }

          }).data('typingSkillTraining', {
              // save disable function on "jQuery data"
                off: options.disableFunction
              , panel: options.panel
          });

          return this;
      }
  });
})(jQuery);
