describe("typingSkillTraining panel tests", function() {
  var sh = specHelper();

  beforeEach(function() {
    $("#sandbox")
      .append("<div class='panel'></div>")
      .find(".panel")
      .append("<ul><li class='lastTimeSpan'></li></ul>");
      
    sh.defaultOpt.panel = $(".panel");
    sh.enablePlugin();
  });

  afterEach(function(){
    sh.disablePlugin()
  });

  it("initial text of lastTimeLabel is 0.000 seconds", function() {
    var info = {timeSpan: 1234};
    var panel = $(sh.global).data("typingSkillTraining").panel;

    expect(panel).toBeDefined();
    expect(panel.find(".lastTimeSpan").text()).toBe("0.000 seconds");
  });
});

