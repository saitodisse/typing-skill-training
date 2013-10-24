var globalObj = this;
describe("typingSkillTraining keyup tests", function() {

  var triggerKeyUp = function(key, context){
        if(context === undefined){
          context = globalObj;
        }
        $(context).trigger($.Event("keyup", { which: key }));
      }
  ;

  beforeEach(function() {
    $(globalObj).typingSkillTraining();
  });

  it("$.fn.typingSkillTraining is defined", function() {
    expect($.prototype.typingSkillTraining).toBeDefined();
    expect($.fn.typingSkillTraining).toBeDefined();
  });

  it("typingSkillTraining.enabled triggered on init", function() {
    var spyEvent = spyOnEvent(globalObj, 'typingSkillTraining.enabled');
    $(globalObj).typingSkillTraining();
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("typingSkillTraining.enabled triggered on init on other element", function() {
    var otherElement = $("<div/>");
    var spyEvent = spyOnEvent(otherElement, 'typingSkillTraining.enabled');
    $(otherElement).typingSkillTraining();
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("typingSkillTraining.keyup triggered on keyup", function() {
    var spyEvent = spyOnEvent(globalObj, 'typingSkillTraining.keyup');
    triggerKeyUp(64);
    expect(spyEvent).toHaveBeenTriggered();
  });


  it("typingSkillTraining.keyup gives the event.which", function() {
    var keyPressed;
    $(globalObj).on("typingSkillTraining.keyup", function(ev, opt){
      keyPressed = opt.which;
    });

    triggerKeyUp(64);

    expect(keyPressed).toEqual(64);
  });
});

