describe("typingSkillTraining panel tests", function() {
  var sh = specHelper()
    , panel
  ;

  beforeEach(function() {
    $("#sandbox")
      .append("<div class='panel'></div>")
      .find(".panel")
      .append("<ul><li class='lastTimeSpan'></li></ul>");

    sh.defaultOpt.panel = $(".panel");
    sh.enablePlugin();
    panel = $(sh.global).data("typingSkillTraining").panel;
  });

  afterEach(function(){
    sh.disablePlugin();
    sh.clearSandbox();
  });

  it("initial text of lastTimeLabel is 0.000 seconds", function() {
    expect(panel).toBeDefined();
    expect(panel.find(".lastTimeSpan").text()).toBe("0.000 seconds");
  });
});

