var Car = function() {
  this.angle = Math.random() * 360;
  this.x = Math.random() * canvasElement.width;
  this.y = Math.random() * canvasElement.height;
  this.width = this.defaultWidth;
  this.height = this.defaultLength;
  this.speed = 10;

  this.inTraffic = false;

  this.fov = 140;
  this.scanDistance = 120;

  this.steeringAngle = 0;

  this.targetSpeed = 25;
  this.targetAngle = Math.random() * 360;

  this.display = '';

  Car.cars.push(this);
  objects.push(this);
}

Car.cars = [];

Car.prototype.defaultWidth = 12;
Car.prototype.defaultLength = 24;

Car.prototype.tick = function() {
  /* update the x, y coordinates based on angle and speed */
  this.x += (Math.cos(Angles.toRadians(this.angle)) * this.speed / 10);
  this.y += (Math.sin(Angles.toRadians(this.angle)) * this.speed / 10);

  /* steering */
  //if ((Math.abs(this.angle - this.targetAngle) > 1) && this.speed > 1) {
    //var turnMultiple = 0.4;

    this.angle = (this.angle + (this.steeringAngle / 180)).mod(360);

    // this.angle = (this.angle + Angles.directionBetween(this.angle, this.targetAngle) * turnMultiple).mod(360);
   // if (this.speed > 10) { this.speed -= 0.25; }
  //} else {

    if (!this.inTraffic) {
      this.steeringAngle = 0;
      if (this.targetSpeed < 30) { this.targetSpeed++; }
      if (this.speed < this.targetSpeed) { this.speed += 0.2; }
    }

    if (this.speed > this.targetSpeed) { this.speed -= 0.8; }
  //}

  /* if we go off the canvas */
  if (this.x < 0 || this.x > canvasElement.width || this.y < 0 || this.y > canvasElement.height) {
    this.x = Math.random() * canvasElement.width;
    this.y = Math.random() * canvasElement.height;
    this.targetAngle = Math.random() * 360;
  }

  this.inTraffic = false;
  this.display = '';
  /* if we're too close to another car */
  for (var car of Car.cars) {
    if (car === this) {
      continue;
    }

    // I don't think the cars are looking 'ahead' but to the side 
    var distanceBetween = Math.sqrt(Math.pow(this.x - car.x, 2) + Math.pow(this.y - car.y, 2));

    if (distanceBetween > this.scanDistance) {
      continue;
    }

    var angleBetween = (360 - (this.angle - Angles.between(this.x, this.y, car.x, car.y))) % 360;

    if (angleBetween > 180) {
      angleBetween -= 360;
    }
    //var angleDifference = Angles.differenceBetween(this.angle, angleBetween);

        this.display = Math.round(angleBetween) + ' ' + Math.round(distanceBetween) + ' away '; // Angles.differenceBetween(this.angle, angleBetween);
        //this.display = angleBetween + ' ' + this.x + ' ' + this.y + ' ' + car.x + ' ' + car.y;

    if (distanceBetween < this.scanDistance) {
      if (  (angleBetween > ((this.fov / 2) * -1)) && (angleBetween < (this.fov / 2))   ) {
        this.inTraffic = true;
        if (this.targetSpeed > 5) { this.targetSpeed--; }

        if (angleBetween > 0) {
          this.steeringAngle = -90;
        } else {
          this.steeringAngle = 90;
        }

        if (distanceBetween < this.scanDistance / 3) {
          this.targetSpeed = 0;
        }

      }



    }

  }
}

Car.prototype.render = function() {
  canvas.save();
  canvas.translate(this.x, this.y);
  //canvas.rotate(Angles.toRadians(-90));
  
  //canvas.beginPath();
  //canvas.moveTo(0, 0);
  //canvas.lineTo(100 * Math.cos(Angles.toRadians(this.targetAngle)), 100 * Math.sin(Angles.toRadians(this.targetAngle)));
  //canvas.strokeStyle = '#fcc';
  //canvas.stroke();

    canvas.fillStyle = "black";
  canvas.font = "normal 8px Verdana";
  canvas.fillText(this.display + " - " + Math.round(this.speed) + 'mph inTraffic:' + this.inTraffic, 18, 18);


  canvas.rotate(Angles.toRadians(this.angle));

  canvas.beginPath();
  canvas.linewidth = 1;
  canvas.moveTo(0,0);
  canvas.lineTo(this.scanDistance * Math.cos(Angles.toRadians((this.fov / 2) * -1)), this.scanDistance * Math.sin(Angles.toRadians((this.fov / 2) * -1)));
  canvas.arc(0, 0, this.scanDistance, Angles.toRadians((this.fov / 2) * -1), Angles.toRadians(this.fov / 2));
  canvas.lineTo(0, 0);

  if (this.inTraffic) {
    canvas.fillStyle = "rgba(255, 255, 100, 0.4)";
  } else {
    canvas.fillStyle = "rgba(255, 240, 100, 0.2)";
  }

  canvas.fill();

  canvas.fillStyle = "rgba(0, 0, 0, 1.0)";

  canvas.beginPath();
  canvas.moveTo(0, 0);
  canvas.lineTo(this.scanDistance, 0);
  canvas.strokeStyle = '#ddd';
  canvas.stroke();

  canvas.fillRect(-(this.height / 2), -(this.width / 2), this.height, this.width);
  canvas.restore();
}
