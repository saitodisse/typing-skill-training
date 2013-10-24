;(function($, window){
  "use strict";
  $(document).ready(function () {
    $('#main_content').headsmart();

    $(window).typingSkillTraining();

    var record;

    var logRecord = function(executedTime){
      if(record === undefined){
        record = executedTime;
      }
      else if(executedTime < record){
        record = executedTime;
      }

      $(".record").text("Your record: " + record + "ms");
    };

    $(window).on("typingSkillTraining.success", function(event, params){
      console.log("typingSkillTraining.success");
      $(".typingSkillTraining-logo").css("color", "green");
      logRecord(params.executedTime);
      $(".description").text(params.executedTime + "ms");
    });

    $(window).on("typingSkillTraining.fail", function(event, params){
      $(".typingSkillTraining-logo").css("color", "red");
      $(".description").text("try again...");
      console.log("typingSkillTraining.fail");
    });

    $(window).on("typingSkillTraining.progress", function(event, params){
      $(".typingSkillTraining-logo").css("color", "#7C334F");
      $(".description").text(".");
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

    $("button").click(function(){
      if($(this).text() === "Disable TypingSkillTraining Code"){
        $.typingSkillTraining.off();
      }
      else{
        $.typingSkillTraining();
      }

    });
  });
})(jQuery, window);
