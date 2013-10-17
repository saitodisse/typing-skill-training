describe("Konami Plug-In", function(){
  it("konami exists", function(){
    expect($.Konami).toBeDefined();
  })

  it("checkKonamiCode returns event and array", function(){
    var konami = new $.Konami();
    var fail = undefined;

    $(window).on("konami.fail", function(event, params){
      fail = true;
    });
    konami.checkKonamiCode(13);
    expect(fail).toBe(true);

  })

  it("correct konami code returns konami.success event", function(){
    var konami = new $.Konami();
    var wasSuccess = false;
    var fail = false;

    $(window).on("konami.success", function(event, params){
        wasSuccess = true;
    });

    $(window).on("konami.fail", function(event, params){
      fail = true;
    });

    konami.checkKonamiCode(38);
    konami.checkKonamiCode(38);
    konami.checkKonamiCode(40);
    konami.checkKonamiCode(40);
    konami.checkKonamiCode(37);
    konami.checkKonamiCode(39);
    konami.checkKonamiCode(37);
    konami.checkKonamiCode(39);
    konami.checkKonamiCode(66);
    konami.checkKonamiCode(65);
    konami.checkKonamiCode(13);

    expect(wasSuccess).toBeTruthy();
    expect(fail).toBeFalsy();
  })

  it("konami.progress: isCorret", function(){
    var konami = new $.Konami();
    var isCorretNow;

    $(window).on("konami.progress", function(event, params){
      isCorretNow = params.isCorret;
    });

    konami.checkKonamiCode(40); //fail
    expect(isCorretNow).toBeFalsy();

    konami.checkKonamiCode(40); //fail
    expect(isCorretNow).toBeFalsy();

    konami.checkKonamiCode(38); //success
    expect(isCorretNow).toBeTruthy();
  })
});
