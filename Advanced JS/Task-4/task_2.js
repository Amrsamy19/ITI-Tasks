function Vehicle(speed = 0, color = "white") {
  const speed = 0;
  const color = "white";

  this.getSpeed = function () {
    return speed;
  };

  this.getColor = function () {
    return color;
  };

  this.setSpeed = function (speed) {
    this.speed = speed;
  };

  this.setColor = function (color) {
    this.color = color;
  };

  this.turnLeft = function () {
    console.log("Turn left");
  };

  this.turnRight = function () {
    console.log("Turn right");
  };

  this.start = function () {
    console.log("Start");
  };

  this.stop = function () {
    console.log("Stop");
  };

  this.goBackward = function () {
    console.log("Go backward");
  };

  this.goForward = function () {
    console.log("Go forward");
  };
}

function Bicycle() {
  Vehicle.call(this);

  this.ringBell = function () {
    console.log("Ring bell");
  };

  this.toString = function () {
    return `Bicycle: Speed: ${this.speed}, Color: ${this.color}`;
  };
}

Bicycle.prototype = Object.create(Vehicle.prototype);
Bicycle.prototype.constructor = Bicycle;

function MotorVehicle(speed = 0, color = "white") {
  const sizeOfEngine = 0;
  const licensePlate = "ABC1234";

  this.getSizeOfEngine = function () {
    return sizeOfEngine;
  };

  this.getLicensePlate = function () {
    return licensePlate;
  };

  this.setLicensePlate = function (licensePlate) {
    this.licensePlate = licensePlate;
  };

  this.setSizeOfEngine = function (sizeOfEngine) {
    this.sizeOfEngine = sizeOfEngine;
  };

  this.toString = function () {
    return `Motor vehicle: Size of engine: ${this.sizeOfEngine}, License plate: ${this.licensePlate}`;
  };

  Vehicle.call(this, speed, color);
}

MotorVehicle.prototype = Object.create(Vehicle.prototype);
MotorVehicle.prototype.constructor = MotorVehicle;

function DumpTruck() {
  const loadCapacity = 0;
  const numberOfWheels = 0;
  const weight = 0;

  this.getLoadCapacity = function () {
    return loadCapacity;
  };

  this.getNumberOfWheels = function () {
    return numberOfWheels;
  };

  this.getWeight = function () {
    return weight;
  };

  this.setLoadCapacity = function (loadCapacity) {
    this.loadCapacity = loadCapacity;
  };

  this.setNumberOfWheels = function (numberOfWheels) {
    this.numberOfWheels = numberOfWheels;
  };

  this.setWeight = function (weight) {
    this.weight = weight;
  };

  this.lowerLoad = function () {
    console.log("Lower load");
  };

  this.raiseLoad = function () {
    console.log("Raise load");
  };

  this.toString = function () {
    return `Dump truck: Load capacity: ${this.loadCapacity}, Number of wheels: ${this.numberOfWheels}, Weight: ${this.weight}`;
  };

  MotorVehicle.call(this);
}

DumpTruck.prototype = Object.create(MotorVehicle.prototype);
DumpTruck.prototype.constructor = DumpTruck;

function Car() {
  const numberOfDoors = 0;
  const numberOfWheels = 0;
  const weight = 0;

  this.getNumberOfDoors = function () {
    return numberOfDoors;
  };

  this.getNumberOfWheels = function () {
    return numberOfWheels;
  };

  this.getWeight = function () {
    return weight;
  };

  this.setNumberOfDoors = function (numberOfDoors) {
    this.numberOfDoors = numberOfDoors;
  };

  this.setNumberOfWheels = function (numberOfWheels) {
    this.numberOfWheels = numberOfWheels;
  };

  this.setWeight = function (weight) {
    this.weight = weight;
  };

  this.switchOnAirConditioning = function () {
    console.log("Switch on air conditioning");
  };

  this.switchOffAirConditioning = function () {
    console.log("Switch off air conditioning");
  };

  this.toString = function () {
    return `Car: Number of doors: ${this.numberOfDoors}, Number of wheels: ${this.numberOfWheels}, Weight: ${this.weight}`;
  };

  MotorVehicle.call(this);
}

Car.prototype = Object.create(MotorVehicle.prototype);
Car.prototype.constructor = Car;
