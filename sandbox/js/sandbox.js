$(function(){
  var glob = $(window)

      // flashes an element
    , blink = function(elementOrSelector, options){
        var eleJq = $(elementOrSelector);
        
        // get the jQuery element itself if "elementOrSelector" is a jQuery element
        if( $.isFunction(elementOrSelector.val) ){
          eleJq = elementOrSelector;
        }

        // initialize options if no options was passed
        if(!options){
          options = {};
        }

        // uses jQuery.color plug-in to animate background color
        eleJq
          .stop()
          .animate( { backgroundColor: options.color_start || "#5f5" }
                  , options.speed_start || 20 )
          .animate( { backgroundColor: options.color_finish || "#fff"}
                  , options.speed_finish || 50 );
      }

      // print all properties of an object
    , printProperties = function(obj){
        if(obj === undefined){
          return;
        }
        
        //gets all properties
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

      // update virtual keyboard color flashes
    , blinkKeyboard = function(opt){
            // blink last element (index - 1)
        var i = opt.index > 0 ? opt.index - 1 : 0

            // default values for animation
          , speed_start = 50
          , speed_finish = 100
          , color_start = "#3dd"
        ;

        if(opt.status === "success"){
          // blink all keyboard container if was a success
          blink(
              $(".key-box-container")
            , {   
                  color_start: "#3f3"
                , color_finish:"#eee"
                , speed_start: speed_start 
                , speed_finish: 1200 
              }
          );
        }
        else if(opt.status === "fail"){
          color_start = "#f33";
          speed_finish = 800;
        }

        // blink key on virtual keyboard
        blink(
            $(".key:eq(" + i + ")")
          , {   
                color_start: color_start
              , color_finish:"#eee"
              , speed_start: speed_start 
              , speed_finish: speed_finish 
            }
        );
      }
  ;

  // initialize the keyboard jQuery plug-in
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
      blink(  "#progress"
            , { 
                  color_start: "#aff"
                , speed_start: 50
                , speed_finish: 100
              }
        );
      $("#progress").html(printProperties(opt));

      blinkKeyboard(opt);
    }
  });

});