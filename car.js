var Car = function() {
	this.angle = 45;
	this.targetAngle = Math.random() * 360;
	this.steeringAngle = 0;
	this.x = Math.random() * canvasElement.width;
	this.y = Math.random() * canvasElement.height;
	this.speed = 20 + Math.random() * 40;
	this.width = this.defaultWidth;
	this.height = this.defaultLength;
	Car.prototype.cars.push(this);
	objects.push(this);
}

Car.prototype.cars = [];

Car.prototype.defaultWidth = 12;
Car.prototype.defaultLength = 24;

Car.prototype.tick = function() {
	this.x += (Math.cos(Angles.toRadians(this.angle)) * this.speed / 30);
	this.y += (Math.sin(Angles.toRadians(this.angle)) * this.speed / 30);

	if (Math.abs(this.angle - this.targetAngle) > 1) {
		this.angle = (this.angle + Angles.directionBetween(this.angle, this.targetAngle)).mod(360);
		if (this.speed > 10) { this.speed -= 0.25; }
	} else {
		if (this.speed < 70) { this.speed++; }
	}

	if (this.x < 0 || this.x > canvasElement.width || this.y < 0 || this.y > canvasElement.height) {
		//this.targetAngle = (this.targetAngle + 180).mod(360);
			this.x = Math.random() * canvasElement.width;
	this.y = Math.random() * canvasElement.height;
		this.targetAngle = Math.random() * 360;

	}
}

Car.prototype.render = function() {
	canvas.save();
	canvas.translate(this.x, this.y);
	//canvas.rotate(Angles.toRadians(-90));	
	canvas.beginPath();
	canvas.moveTo(0, 0);
	canvas.lineTo(100 * Math.cos(Angles.toRadians(this.targetAngle)), 100 * Math.sin(Angles.toRadians(this.targetAngle)));
	canvas.strokeStyle = '#fcc';
	canvas.stroke();
	canvas.rotate(Angles.toRadians(-90 + this.angle));

	canvas.beginPath();
	canvas.moveTo(0, 0);
	canvas.lineTo(0, 100);
	canvas.strokeStyle = '#ccc';
	canvas.stroke();

	canvas.fillRect(-(this.width / 2), - (this.width / 2), this.width, this.height);
	canvas.restore();
}
