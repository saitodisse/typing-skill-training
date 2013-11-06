$(function(){
  var glob = $(window)
    , btnEnable1 = $("#enableTypingSkillTraining1")
    , btnDisable1 = $("#disableTypingSkillTraining1")
    , typingSkillTraining1
  ;

  var blink = function(elementOrSelector, options){
    var eleJq = $(elementOrSelector);

    if( $.isFunction(elementOrSelector.val) ){
      eleJq = elementOrSelector;
    }

    if(!options){
      options = {};
    }

    eleJq
      .stop()
      .animate({
        backgroundColor: options.color_start || "#5f5"
      }, options.speed_start || 20 )
      .animate({
        backgroundColor: options.color_finish || "#fff"
      }, options.speed_finish || 50 );
  };

  var printProperties = function(obj){
    if(obj === undefined){
      return;
    }
    var props = Object.getOwnPropertyNames(obj);
    var result = "";
    for (var i = 0; i < props.length; i++) {
      var item = props[i];

      if(i > 0){
        result += "<br />";
      }
      result += item;
      result += ": ";
      result += obj[props[i]];
    };

    return result;
  }

  glob.typingSkillTraining({
      onDisable: function(){
      blink("#disabled");
    }

    , onEnable: function(){
      blink("#enabled");
    }

    , onKeyup: function(opt){
      blink("#keyup");
      $("#keyup").html(printProperties(opt));
    }

    , onFail: function(){
      blink("#fail", {color_start: "#f33"});
    }

    , onSuccess: function(opt){
      blink("#success");
      $("#success").html(printProperties(opt));
    }

    , onProgress: function(opt){
      blink("#progress");
      $("#progress").html(printProperties(opt));
      
      var i = opt.index > 0 ? opt.index - 1 : 0
        , speed_start = 50
        , speed_finish = 100


      var color = "#3dd";
      if(opt.status === "success"){
        color = "#3f3";
        speed_finish = 1200;

        blink(
            $(".key-box-container")
          , { color_start: color
            , color_finish:"#eee"
            , speed_start: speed_start 
            , speed_finish: speed_finish 
            }
        );
      }
      else if(opt.status === "fail"){
        color = "#f33";
        speed_finish = 800;
      }

      blink(
          $(".key:eq(" + i + ")")
        , { color_start: color
          , color_finish:"#eee"
          , speed_start: speed_start 
          , speed_finish: speed_finish 
          }
      );
    }

  });      

  btnDisable1.click(function(){
    glob.data("typingSkillTraining").off();
  });

});