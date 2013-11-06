var globalObj = this;

describe("typingSkillTraining keyup tests", function() {

  var   triggerKeyUp = function(key, context){
          if(context === undefined){
            context = globalObj;
          }
          $(context).trigger($.Event("keyup", { which: key }));
        }
      , on_enabled_executed = false
      , on_fail_executed = false
      , on_success_executed = false
      , on_progress_count = 0
      , on_keyup_list = []
  ;

  beforeEach(function() {
    on_enabled_executed = false;
    on_fail_executed = false;
    on_success_executed = false;
    on_keyup_list = [];
    on_progress_count = 0;

    // enable plugin
    $(globalObj).typingSkillTraining({
        onDisable: function(){
      }

      , onEnable: function(){
        on_enabled_executed = true;
      }

      , onKeyup: function(opt){
        on_keyup_list.push(opt.which);
      }

      , onFail: function(){
        on_fail_executed = true;
      }

      , onSuccess: function(opt){
        on_success_executed = true;
      }

      , onProgress: function(opt){
        on_progress_count += 1;
      }
    });    
  });

  afterEach(function(){
    // disable plugin
    $(globalObj).data("typingSkillTraining").off();
  });

  it("$.fn.typingSkillTraining is defined", function() {
    expect($.prototype.typingSkillTraining).toBeDefined();
    expect($.fn.typingSkillTraining).toBeDefined();
  });

  it("typingSkillTraining.enabled triggered on init", function() {
    expect(on_enabled_executed).toBeTruthy();
  });

  it("onKeyup triggered on keyup", function() {
    triggerKeyUp(64);
    expect(on_keyup_list[0]).toEqual(64);
  });

  it("onFail triggered on wrong key pressed", function() {
    expect(on_fail_executed).toBeFalsy();
    triggerKeyUp(64);
    expect(on_fail_executed).toBeTruthy();
  });

  it("onFail not triggered when right key was pressed", function() {
    expect(on_fail_executed).toBeFalsy();
    triggerKeyUp(38);
    expect(on_fail_executed).toBeFalsy();
    triggerKeyUp(38);
    expect(on_fail_executed).toBeFalsy();
  });

  it("onSuccess: sall correct sequence leads to success", function() {
    expect(on_success_executed).toBeFalsy();
    triggerKeyUp(38);
    triggerKeyUp(38);
    triggerKeyUp(40);
    triggerKeyUp(40);
    triggerKeyUp(37);
    triggerKeyUp(39);
    triggerKeyUp(37);
    triggerKeyUp(39);
    triggerKeyUp(66);
    triggerKeyUp(65);
    triggerKeyUp(13);
    expect(on_success_executed).toBeTruthy();
  });

  it("onProgress should be called all times", function() {
    triggerKeyUp(38);
    triggerKeyUp(38);
    triggerKeyUp(40);
    triggerKeyUp(40);
    triggerKeyUp(37);
    triggerKeyUp(39);
    triggerKeyUp(37);
    triggerKeyUp(39);
    triggerKeyUp(66);
    triggerKeyUp(65);
    triggerKeyUp(13);
    expect(on_progress_count).toBe(11);
  });

});

