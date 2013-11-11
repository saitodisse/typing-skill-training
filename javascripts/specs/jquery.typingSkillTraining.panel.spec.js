describe("typingSkillTraining panel tests", function() {
  var sh = specHelper();

  beforeEach(function() {
    sh.defaultOpt.panel = $("<div class='panel'></div>");
    sh.enablePlugin();
  });

  afterEach(function(){
    sh.disablePlugin()
  });

  it("panel does has a last time label", function() {
    var info = {timeSpan: 1234};
    var panel = $(sh.global).data("typingSkillTraining").panel;
    expect(panel).toBeDefined();

    expect(panel.find(".lastTimeSpan").text()).toBe("last time: 0.000 sec");
  });
});

