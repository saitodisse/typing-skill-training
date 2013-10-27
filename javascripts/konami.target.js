;(function(ns){
  ns.Target = function(global){
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

    this.global = global;

    this.initEvents = function(){
      global.on("typingSkillTraining.success", function(event, params){
        console.log("typingSkillTraining.success");
        $(".typingSkillTraining-logo").css("color", "green");
        logRecord(params.executedTime);
        $(".description").text(params.executedTime + "ms");
        $(".keysPressed").css("color", "green");
        $(".keysPressed").fadeOut(function(){
          $(".keysPressed").text("");
          $(".keysPressed").show();
        });
      });

      global.on("typingSkillTraining.fail", function(event, params){
        $(".typingSkillTraining-logo").css("color", "red");
        $(".description").text("try again...");
        $(".keysPressed").text("");
        console.log("typingSkillTraining.fail");
      });

      global.on("typingSkillTraining.progress", function(event, params){
        event.preventDefault();

        $(".typingSkillTraining-logo").css("color", "#7C334F");
        $(".description").text(".");

        var keyPressedText = $(".keysPressed").text();
        if(keyPressedText.length === 0){
          $(".keysPressed").text(params.received);
        } else{
          $(".keysPressed").text($(".keysPressed").text() + ", "+ params.received);
        }


        console.log(params.expected,
                    params.received,
                    params.index);
      });

      global.on("typingSkillTraining.enabled", function(){
          $("button").text("Disable TypingSkillTraining Code");
      });

      global.on("typingSkillTraining.disabled", function(){
          $("button").text("Enable TypingSkillTraining Code");
      });


    }
  }
}(Konami));
