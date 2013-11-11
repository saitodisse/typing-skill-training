;(function(ns){
  ns.TypingComponent = function(targetElement){
    this.targetElement = targetElement;

    this.init = function(opt){
      Sandbox.typingComponent = targetElement.typingSkillTraining(opt);
    }
  }
}(Sandbox));
