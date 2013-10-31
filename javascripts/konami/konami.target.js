;(function(ns){
  ns.Target = function(targetElement){
    var record
      , logRecord = function(executedTime){
          if(record === undefined){
            record = executedTime;
          }
          else if(executedTime < record){
            record = executedTime;
          }

          $(".record").text("Your record: " + record + "ms");
        }
    ;

    this.initTypingComponent = function(){
      this.typingComponent = new Konami.TypingComponent(targetElement);
      this.typingComponent.init({
          onEnable: function(){
            $("button").text("Disable TypingSkillTraining Code");
        }

        , onDisable: function(){
            $("button").text("Enable TypingSkillTraining Code");
        }

        , onKeyup: function(opt){
          //$("#keyup").text(printProperties(opt));
        }

        , onFail: function(){
          $(".typingSkillTraining-logo").css("color", "red");
          $(".description").text("try again...");
          $(".keysPressed").text("");
        }

        , onSuccess: function(opt){
          $(".typingSkillTraining-logo").css("color", "green");
          logRecord(opt.executedTime);
          $(".description").text(opt.executedTime + "ms");
          $(".keysPressed").css("color", "green");
          $(".keysPressed").fadeOut(function(){
            $(".keysPressed").text("");
            $(".keysPressed").show();
          });
        }

        , onProgress: function(opt){
          $(".typingSkillTraining-logo").css("color", "#7C334F");
          $(".description").text(".");

          var keyPressedText = $(".keysPressed").text();
          if(keyPressedText.length === 0){
            $(".keysPressed").text(opt.received);
          } else{
            $(".keysPressed").text($(".keysPressed").text() + ", "+ opt.received);
          }
        }
      });
    }
  }
}(Konami));
