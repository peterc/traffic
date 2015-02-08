var frames = 0;
var objects = [];
var lastTime = Date.now();
var running = false;

var canvasElement = document.getElementById('main');
var canvas = canvasElement.getContext('2d');

var loop = function() {
  frames++;

  if (running) {
    for (object of objects) {
      object.tick();
    }
  }

  requestAnimationFrame(loop);

  canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);

  for (object of objects) {
    object.render();
  }

  if (frames % 100 == 0) {
    var newTime = Date.now();
    var fps = 1000 / ((newTime - lastTime) / 100);
    console.log(Math.round(fps) + " fps");
    lastTime = newTime;
  }

}

loop();

canvasElement.addEventListener('click', function(e) {
  if (running) {
    running = false;
  } else {
    running = true;
  }

}, false);
