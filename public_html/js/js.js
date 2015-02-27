'use strict';

function $(element){
  return document.getElementById(element);
}

(function(window){
  var sprites=[],
  _spritesData = [[10, 96, 144], [10, 96, 144], [4, 107, 96], [4, 80, 105], [4, 80, 64], [8, 60, 60]],
  animations = [];
  
  for(var i in _spritesData){
    sprites.push({
      image:'images/sprite'+i+'.png',
      counter:_spritesData[i][0],
      width:_spritesData[i][1],
      height:_spritesData[i][2]
    });
  }
  
  function newAnimation(e){
    if(e.toElement != document.body) return;
    var fps = $('fps').value.toNum() ? $('fps').value.toNum() : 12;
    var sprite = sprites[$('sprite').value];
    fps = Math.floor(1000 / fps);
    var animation = new SpriteAnimation({
      x: e.x,
      y: e.y,
      directionNum: $('direction').value,
      step: $('step').value.toNum() ? $('step').value.toNum() : 10,
      fps: fps,
      sprite: sprite
    });
    if(animation) {
      animation.getElement().addEventListener('destroy', function(e){
        animations.splice(animations.indexOf(animation), 1);
        $('instances').innerText = animations.length;
      });
      animations.push(animation);
      $('instances').innerText = animations.length;
    }
  }

  function removeAnimations(){
    for(var i in animations) {
      var animation = animations[i];
      animation.destroy();
      delete(animations[i]);
    }
    animations = [];
    $('instances').innerText = animations.length;
  }

  addEventListener('click', newAnimation);

  function onLoad(){
    $('cleanAll').addEventListener('click', removeAnimations);
  }
  window.addEventListener('load', onLoad);
})(window);