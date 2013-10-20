;(function($, window){
  "use strict";
  $(document).ready(function () {
    $('#main_content').headsmart();

    $.konami();

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

    $(window).on("konami.success", function(event, params){
      console.log("konami.success");
      $(".konami-logo").css("color", "green");
      logRecord(params.executedTime);
      $(".description").text(params.executedTime + "ms");
    });

    $(window).on("konami.fail", function(event, params){
      $(".konami-logo").css("color", "red");
      $(".description").text("try again...");
      console.log("konami.fail");
    });

    $(window).on("konami.progress", function(event, params){
      $(".konami-logo").css("color", "#7C334F");
      $(".description").text(".");
      console.log(params.expected,
                  params.received,
                  params.index);
    });

    $(window).on("konami.enabled", function(){
        $("button").text("Disable Konami Code");
    });

    $(window).on("konami.disabled", function(){
        $("button").text("Enable Konami Code");
    });

    $("button").click(function(){
      if($(this).text() === "Disable Konami Code"){
        $.konami.off();
      }
      else{
        $.konami();
      }

    });
  });
})(jQuery, window);
