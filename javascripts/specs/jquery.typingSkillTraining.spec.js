var globalObj = this;

describe("typingSkillTraining keyup tests", function() {

  var sh = specHelper();        

  beforeEach(function() {
    sh.on_enabled_executed = false;
    sh.on_fail_executed = false;
    sh.on_success_executed = false;
    sh.on_keyup_list = [];
    sh.on_progress_count = 0;

    sh.enablePlugin();
  });

  afterEach(function(){
    sh.disablePlugin()
  });

  it("$.fn.typingSkillTraining is defined", function() {
    expect($.prototype.typingSkillTraining).toBeDefined();
    expect($.fn.typingSkillTraining).toBeDefined();
  });

  it("typingSkillTraining.enabled triggered on init", function() {
    expect(sh.on_enabled_executed).toBeTruthy();
  });

  it("onKeyup triggered on keyup", function() {
    sh.triggerKeyUp(64);
    expect(sh.on_keyup_list[0]).toEqual(64);
  });

  it("onFail triggered on wrong key pressed", function() {
    expect(sh.on_fail_executed).toBeFalsy();
    sh.triggerKeyUp(64);
    expect(sh.on_fail_executed).toBeTruthy();
  });

  it("onFail not triggered when right key was pressed", function() {
    expect(sh.on_fail_executed).toBeFalsy();
    sh.triggerKeyUp(38);
    expect(sh.on_fail_executed).toBeFalsy();
    sh.triggerKeyUp(38);
    expect(sh.on_fail_executed).toBeFalsy();
  });

  it("onSuccess: sall correct sequence leads to success", function() {
    expect(sh.on_success_executed).toBeFalsy();
    sh.triggerKeyUp(38);
    sh.triggerKeyUp(38);
    sh.triggerKeyUp(40);
    sh.triggerKeyUp(40);
    sh.triggerKeyUp(37);
    sh.triggerKeyUp(39);
    sh.triggerKeyUp(37);
    sh.triggerKeyUp(39);
    sh.triggerKeyUp(66);
    sh.triggerKeyUp(65);
    sh.triggerKeyUp(13);
    expect(sh.on_success_executed).toBeTruthy();
  });

  it("onProgress should be called all times", function() {
    sh.triggerKeyUp(38);
    sh.triggerKeyUp(38);
    sh.triggerKeyUp(40);
    sh.triggerKeyUp(40);
    sh.triggerKeyUp(37);
    sh.triggerKeyUp(39);
    sh.triggerKeyUp(37);
    sh.triggerKeyUp(39);
    sh.triggerKeyUp(66);
    sh.triggerKeyUp(65);
    sh.triggerKeyUp(13);
    expect(sh.on_progress_count).toBe(11);
  });

  it("the keys combinations can be changed", function(){
    sh.disablePlugin();
    sh.defaultOpt.sequence = [13, 14, 15];
    sh.enablePlugin();

    sh.triggerKeyUp(13);
    sh.triggerKeyUp(14);
    sh.triggerKeyUp(15);
    expect(sh.on_progress_count).toBe(3);
    expect(sh.on_success_executed).toBeTruthy();
  });

});

