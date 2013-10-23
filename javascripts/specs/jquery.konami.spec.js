var globalObj = this;
describe("konami keyup tests", function() {
  var konami;

  beforeEach(function() {
    var konami = $(globalObj).konami();
  });

  it("$.fn.konami is defined", function() {
    expect($.prototype.konami).toBeDefined();
    expect($.fn.konami).toBeDefined();
  });

  it("konami.enabled triggered on init", function() {
    var spyEvent = spyOnEvent(globalObj, 'konami.enabled');
    konami = $(globalObj).konami();
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("konami.enabled triggered on init on other element", function() {
    var otherElement = $("<div/>");
    var spyEvent = spyOnEvent(otherElement, 'konami.enabled');
    konami = $(otherElement).konami();
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("konami.off() trigger konami.disabled ", function() {
    var spyEvent = spyOnEvent(globalObj, 'konami.disabled');
    $(globalObj).konami.off();
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("konami.keyup triggered on keyup", function() {
    var spyEvent = spyOnEvent(globalObj, 'konami.keyup');
    $(globalObj).trigger($.Event("keyup", { which: 64 }));
    expect(spyEvent).toHaveBeenTriggered();
  });

  it("konami.keyup gives the event.which", function() {
    var keyPressed;
    $(globalObj).on("konami.keyup", function(ev, opt){
      keyPressed = opt.which;
    });

    $(globalObj).trigger($.Event("keyup", { which: 64 }));

    expect(keyPressed).toEqual(64);
  });
});

