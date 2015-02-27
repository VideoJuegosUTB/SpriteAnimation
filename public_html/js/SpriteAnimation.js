'use strict';
String.prototype.toNum = function(){
  return parseInt(this);
};
Number.prototype.toPx = function(){
  return this + 'px';
};

function SpriteAnimation(opts){
  var options = {
    fps: 12,
    step: 15,
    directions: ['down', 'left', 'right', 'up'],
    className: 'character'
  };
  if(opts || typeof opts == 'object') {
    for(var i in opts) {
      options[i] = opts[i];
    }
  }
  if(!options.sprite){
    console.info('No se ha enviado un sprite para animarlo');
    return false;
  }
  var element = document.createElement('div'),
  direction = options.directions[options.directionNum],
  to = 0,
  x = 0,
  y = options.directionNum * options.sprite.height;

  element.style.position = 'absolute';
  element.style.width = options.sprite.width.toPx();
  element.style.height = options.sprite.height.toPx();
  element.style.top = options.y;
  element.style.left = options.x;
  element.style.background = 'url(' + options.sprite.image + ') no-repeat 0px -' + y.toPx();
  element.className = options.className;

  function onMove(e){
    x = (x + 1) == options.sprite.counter ? 0 : x + 1;
    var nPosition = x * options.sprite.width;
    element.style.backgroundPosition = '-' + nPosition.toPx() + ' -' + y.toPx();
    switch(direction) {
      case 'left':
        if(element.style.left.toNum() - element.style.width.toNum() <= (-element.style.width.toNum() * 2)) {
          element.style.left = window.outerWidth + options.sprite.width;
        }
        break;
      case 'right':
        if(element.style.left.toNum() + element.style.width.toNum() > (window.outerWidth + element.style.width.toNum())) {
          element.style.left = -options.sprite.width;
        }
        break;
      case 'up':
        if(element.style.top.toNum() - element.style.height.toNum() <= (-element.style.height.toNum() * 2)) {
          element.style.top = window.outerHeight + options.sprite.height;
        }
        break;
      case 'down':
        if(element.style.top.toNum() + element.style.height.toNum() > (window.outerHeight + element.style.height.toNum())) {
          element.style.top = -options.sprite.height;
        }
        break;
    }
  }

  function sum(position, decrease){
    if(!decrease)
      return (position.toNum() + options.step).toPx();
    return (position.toNum() - options.step).toPx();
  }

  function step(){
    switch(direction) {
      case 'left':
      case 'right':
        element.style.left = sum(element.style.left, direction == 'left' ? 1 : 0);
        break;
      case 'up':
      case 'down':
        element.style.top = sum(element.style.top, direction == 'up' ? 1 : 0);
        break;
    }
    var event = new Event('move');
    element.dispatchEvent(event);
    to = setTimeout(step, options.fps);
  }

  function destroy(e){
    if(e) {
      element.dispatchEvent(new Event('destroy'));
    }
    element.removeEventListener('move', onMove);
    document.body.removeChild(element);
    return true;
  }

  this.destroy = destroy;
  this.getElement = function(){
    return element;
  };

  to = setTimeout(step, options.fps);
  element.addEventListener('move', onMove);
  element.addEventListener('click', destroy);

  document.body.appendChild(element);

}