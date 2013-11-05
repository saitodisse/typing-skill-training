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
      }, options.speed_start || 50 )
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
        result += "\n";
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
      $("#keyup").text(printProperties(opt));
    }

    , onFail: function(){
      blink("#fail");
    }

    , onSuccess: function(opt){
      blink("#success");
      $("#success").text(printProperties(opt));
    }

    , onProgress: function(opt){
      blink("#progress");
      $("#progress").text(printProperties(opt));
      
      var i = opt.index - 1;
      blink(
          $(".key:eq(" + i + ")")
        , { color_start:"#3ff"
          , color_finish:"#eee"
          , speed_start: 50 
          , speed_finish: 100 
          }
      );
    }

  });      

  btnDisable1.click(function(){
    glob.data("typingSkillTraining").off();
  });

});