;(function(ns){
  ns.TypingComponent = function(targetElement){
    this.targetElement = targetElement;

    this.init = function(opt){
      Konami.typingComponent = targetElement.typingSkillTraining(opt);
    }
  }
}(Konami));
