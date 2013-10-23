var globalObj = this;
describe("konami keyup tests", function() {

  var triggerKeyUp = function(key, context){
        if(context === undefined){
          context = globalObj;
        }
        $(context).trigger($.Event("keyup", { which: key }));
      }
  ;

  beforeEach(function() {
    $(globalObj).konami();
  });

  it("$.fn.konami is defined", function() {
    expect($.prototype.konami).toBeDefined();
    expect($.fn.konami).toBeDefined();
  });

  it("konami.enabled triggered on init", function() {
    var spyEvent = spyOnEvent(globalObj, 'konami.enabled');
    $(globalObj).konami();
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("konami.enabled triggered on init on other element", function() {
    var otherElement = $("<div/>");
    var spyEvent = spyOnEvent(otherElement, 'konami.enabled');
    $(otherElement).konami();
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("konami.off() trigger konami.disabled ", function() {
    var spyEvent = spyOnEvent(globalObj, 'konami.disabled');
    $(globalObj).konami.off();
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("konami.keyup triggered on keyup", function() {
    var spyEvent = spyOnEvent(globalObj, 'konami.keyup');
    triggerKeyUp(64);
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("konami.keyup stopsPropagation", function() {
    var div1Element = $("<div>1</div>").appendTo($("#sandbox"));
    var div2Element = $("<div>2</div>").appendTo(div1Element);

    var spyEvent1 = spyOnEvent(div1Element, 'konami.keyup');
    var spyEvent2 = spyOnEvent(div2Element, 'konami.keyup');

    triggerKeyUp(64, div2Element);

    expect(spyEvent1).not.toHaveBeenTriggered();
    expect(spyEvent2).toHaveBeenTriggered();
  });

  it("konami.keyup gives the event.which", function() {
    var keyPressed;
    $(globalObj).on("konami.keyup", function(ev, opt){
      keyPressed = opt.which;
    });

    triggerKeyUp(64);

    expect(keyPressed).toEqual(64);
  });
});

