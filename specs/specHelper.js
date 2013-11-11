var specHelper = function(){
  var self = {};

  self.global = this;

  self.triggerKeyUp = function(key, context){
      if(context === undefined){
        context = globalObj;
      }
      $(context).trigger($.Event("keyup", { which: key }));
    };
  
  self.simulateSuccess = function(){
    self.triggerKeyUp(38);
    self.triggerKeyUp(38);
    self.triggerKeyUp(40);
    self.triggerKeyUp(40);
    self.triggerKeyUp(37);
    self.triggerKeyUp(39);
    self.triggerKeyUp(37);
    self.triggerKeyUp(39);
    self.triggerKeyUp(66);
    self.triggerKeyUp(65);
    self.triggerKeyUp(13);
  };    

  self.on_enabled_executed = false;
  self.on_fail_executed = false;
  self.on_success_executed = false;
  self.on_progress_count = 0;
  self.on_keyup_list = [];
  
  self.defaultOpt = {
      onDisable: function(){
    }

    , onEnable: function(){
      self.on_enabled_executed = true;
    }

    , onKeyup: function(opt){
      self.on_keyup_list.push(opt.which);
    }

    , onFail: function(){
      self.on_fail_executed = true;
    }

    , onSuccess: function(opt){
      self.on_success_executed = true;
    }

    , onProgress: function(opt){
      self.on_progress_count += 1;
    }
  };

  self.enablePlugin = function(){
      $(globalObj).typingSkillTraining(self.defaultOpt);
    };
  self.disablePlugin = function(){
      $(globalObj).data("typingSkillTraining").off();
    };

  self.clearSandbox = function(){
    $("#sandbox").html("");
  }

  return self;
};