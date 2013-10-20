describe("Konami Plug-In", function(){
  it("konami exists", function(){
    expect($.Konami).toBeDefined();
  });

  it("checkKonamiCode returns event and array", function(){
    var konami = new $.Konami();
    var fail;

    $(window).on("konami.fail", function(event, params){
      fail = true;
    });
    konami.checkKonamiCode(13);
    expect(fail).toBe(true);
  });

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
  });

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
  });

  it("konami.progress: isCorret re-initiate", function(){
    var konami = new $.Konami();
    var isCorretNow;

    $(window).on("konami.progress", function(event, params){
      isCorretNow = params.isCorret;
    });

    konami.checkKonamiCode(38); //success
    expect(isCorretNow).toBeTruthy();

    konami.checkKonamiCode(38); //success
    expect(isCorretNow).toBeTruthy();

    konami.checkKonamiCode(38); //re-initiate
    expect(isCorretNow).toBeTruthy();
  });

  it("konami.progress: isCorret re-initiate 2", function(){
    var konami = new $.Konami();
    var isCorretNow;

    $(window).on("konami.progress", function(event, params){
      isCorretNow = params.isCorret;
    });

    konami.checkKonamiCode(38); //success
    konami.checkKonamiCode(38); //success
    konami.checkKonamiCode(40); //success
    konami.checkKonamiCode(40); //success
    expect(isCorretNow).toBeTruthy();

    konami.checkKonamiCode(38); //re-initiate
    expect(isCorretNow).toBeTruthy();
  });

  it("konami.progress: isCorret re-initiate 3", function(){
    var konami = new $.Konami();
    var isCorretNow;

    $(window).on("konami.progress", function(event, params){
      isCorretNow = params.isCorret;
    });

    konami.checkKonamiCode(38); //success //will be ignored
    expect(isCorretNow).toBeTruthy();

    konami.checkKonamiCode(38); //success
    expect(isCorretNow).toBeTruthy();

    konami.checkKonamiCode(38); // ignores only first key
    expect(isCorretNow).toBeTruthy();

    konami.checkKonamiCode(40); //success
    expect(isCorretNow).toBeTruthy();
  })

  it("compare arrays", function(){
    var konami = new $.Konami();

    expect(konami.compareArray([1,2,3], [1,2,3])).toBeTruthy();
    expect(konami.compareArray([1,2,4], [1,2,3])).toBeFalsy();
    expect(konami.compareArray([1,2,3], [1,2,4])).toBeFalsy();
    expect(konami.compareArray([1,2,3], [1,2,3,4])).toBeFalsy();
  });

  it("trim start", function(){
    var konami = new $.Konami();

    // trim start
    expect(
      konami.compareArray(
        [1,1,2],
        konami.trimStart([1,1,2], [1,1,1,2])
      )
    ).toBeTruthy();

    // do not change
    expect(
      konami.compareArray(
        [],
        konami.trimStart([1,1,2], [1,2])
      )
    ).toBeTruthy();
  });

});
