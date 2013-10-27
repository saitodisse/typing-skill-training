;(function($, window){
  /*
    ALL ELEMENTS that I have on this page:
    $(window)
    $(document)
    $(".record")
    $(".typingSkillTraining-logo")
    $(".description")
    $(".keysPressed")
    $("button")
  */

  "use strict";
  $(document).ready(function () {
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

    $('#main_content').headsmart();

    $(window).typingSkillTraining();

    $(window).on("typingSkillTraining.success", function(event, params){
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

    $(window).on("typingSkillTraining.fail", function(event, params){
      $(".typingSkillTraining-logo").css("color", "red");
      $(".description").text("try again...");
      $(".keysPressed").text("");
      console.log("typingSkillTraining.fail");
    });

    $(window).on("typingSkillTraining.progress", function(event, params){
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

    $(window).on("typingSkillTraining.enabled", function(){
        $("button").text("Disable TypingSkillTraining Code");
    });

    $(window).on("typingSkillTraining.disabled", function(){
        $("button").text("Enable TypingSkillTraining Code");
    });

  });
})(jQuery, window);
