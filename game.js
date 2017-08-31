// Defining variables used in game.js code
var cells = document.getElementsByTagName("div");
var x = document.querySelector("#x");
var y = document.querySelector("#y");
var face = document.querySelector("#face");
var $parent = $('section');
var $placeBtn = $("#place");
var $moveBtn = $("#move");
var $leftBtn = $("#left");
var $rightBtn = $("#right");
var $reportBtn = $("#report");
var $xReport = $(".xReport");
var $yReport = $(".yReport");
var $faceReport = $(".faceReport");

// to disable all buttons except place button until place button is pressed
$moveBtn.attr("disabled", "disabled"); 
$leftBtn.attr("disabled", "disabled"); 
$rightBtn.attr("disabled", "disabled"); 
$reportBtn.attr("disabled", "disabled"); 

//set counter equal to number of rows
var counter = 5;
// drawGrid function is to create grid of given dimensions 
var drawGrid = function(numberOfRows, numberOfColumns) {
	for (var row = 0; row < numberOfRows; row++) {
		counter = counter - 1;
		for (var column = 0; column < numberOfColumns; column++) {
			var $div = $("<div></div>");
			$div.attr("data-x", column);
			$div.attr("data-y", counter);
			$parent.append($div);
		}
	}
}
drawGrid(5, 5)

var pacmanObject = {};
var xInput;
var yInput;
var faceInput;
var counter;

// pacmanSymbol is a common function used by placeSymbol function and updatePosition function to place pacman symbol on grid at right position
var pacmanSymbol = function(passDirection) {
	for (var index = 0; index < cells.length; index++) {
		counter = 0;
	  cells[index].classList.remove("west");

  	if (cells[index].dataset.x == pacmanObject.xCord && cells[index].dataset.y == pacmanObject.yCord && passDirection == "west") {
			cells[index].className = "west"
			counter = 0;
			$(".west").css('transform', 'rotate(' + counter + 'deg)')
			pacmanObject.angle = counter
		} 
		else if (cells[index].dataset.x == pacmanObject.xCord && cells[index].dataset.y == pacmanObject.yCord && passDirection == "north") {
			cells[index].className = "west"
			counter += 90;
			$(".west").css('transform', 'rotate(' + counter + 'deg)')
			pacmanObject.angle = counter
		} 
		else if (cells[index].dataset.x == pacmanObject.xCord && cells[index].dataset.y == pacmanObject.yCord && passDirection == "south") {
			cells[index].className = "west"
			counter -= 90;
			$(".west").css('transform', 'rotate(' + counter + 'deg)')
			pacmanObject.angle = counter
		}	
		else if (cells[index].dataset.x == pacmanObject.xCord && cells[index].dataset.y == pacmanObject.yCord && passDirection == "east") {
			cells[index].className = "west"
			counter += 180;
			$(".west").css('transform', 'rotate(' + counter + 'deg)')
			pacmanObject.angle = counter
		}
 	}
}

// placeSymbol function is to place pacman symbol when place button is clicked after user input
var placeSymbol = function() {
	xInput = x.value;
	yInput = y.value;
	faceInput = face.value.toLowerCase();

	pacmanObject.xCord = xInput
	pacmanObject.yCord = yInput
	pacmanObject.initialDirection = faceInput

	if (pacmanObject.xCord > 4 || pacmanObject.yCord > 4 || pacmanObject.xCord < 0 || pacmanObject.yCord < 0) {
		alert("Please enter value between 0 and 4");
	}

	pacmanSymbol(pacmanObject.initialDirection);
	x.value = ""
	y.value = ""
 	face.value = ""
}
// Added click event listener to place button
$placeBtn.click(placeSymbol);

// to enable all buttons sfter place button is pressed
$placeBtn.click(function () {
	$moveBtn.removeAttr("disabled");
	$leftBtn.removeAttr("disabled");
	$rightBtn.removeAttr("disabled");
	$reportBtn.removeAttr("disabled");
})

// updatePosition function is to place pacman symbol after move button is clicked
var updatePosition = function(pacmanObject) {
	findFinalDirection(pacmanObject);
	pacmanSymbol(pacmanObject.finalDirection);
}

// movePacman function is to update x and y coordinates in pacmanObject
var movePacman = function() {
	findFinalDirection(pacmanObject);
	if (pacmanObject.finalDirection === "west" && pacmanObject.xCord > 0) {
		pacmanObject.xCord = Number(pacmanObject.xCord) - 1
		updatePosition(pacmanObject);	
	} 
	else if (pacmanObject.finalDirection === "east" && pacmanObject.xCord >= 0 && pacmanObject.xCord < 4) {
		pacmanObject.xCord = Number(pacmanObject.xCord) + 1
		updatePosition(pacmanObject);	
	} 
	else if (pacmanObject.finalDirection === "north" && pacmanObject.yCord >= 0 && pacmanObject.yCord < 4) {
		pacmanObject.yCord = Number(pacmanObject.yCord) + 1
		updatePosition(pacmanObject);	
	} 
	else if (pacmanObject.finalDirection === "south" && pacmanObject.yCord > 0) {
		pacmanObject.yCord = Number(pacmanObject.yCord) - 1
		updatePosition(pacmanObject);	
	}
}

// Added click event listener to move button
$moveBtn.click(movePacman);

// leftRotation function is to rotate pacman symbol in anticlockwise direction
var leftRotation = function() {
	pacmanObject.angle -= 90;
	$(".west").css('transform', 'rotate(' + pacmanObject.angle + 'deg)')
	findFinalDirection(pacmanObject);
}

//Added click event listener to left button 
$leftBtn.click(leftRotation);

// rightRotation function is to rotate pacman symbol in clockwise direction
var rightRotation = function() {
	pacmanObject.angle += 90;
	$(".west").css('transform', 'rotate(' + pacmanObject.angle + 'deg)')
	findFinalDirection(pacmanObject);
}

//Added click event listener to right button 
$rightBtn.click(rightRotation);

var directionAngles = [{
  north: [90, -270],
  west: [360, 0, -360],
  south: [270, -90],
  east: [180, -180]
}];

// findFinalDirection is a function to tell final direction of pacman symbol after move, left and right button is clicked based on the current angle
var findFinalDirection = function(pacmanObject) {
	var newAngle;
	newAngle = pacmanObject.angle

	if (newAngle < 0) {
	  while (newAngle < -360) {
	    newAngle += 360;
	  }
	} 
	else {
	  while (newAngle > 360) {
	    newAngle -= 360;
	  }
	}

	Object.keys(directionAngles[0]).forEach(function (key) {
		if (directionAngles[0][key].includes(newAngle)) {
			pacmanObject.finalDirection = key;
    } 
  });
}

// This is to print a report of final pacman position in terms of x-coordinate, y-coordinate and direction
$reportBtn.click(function() {
	$xReport[0].textContent = pacmanObject.xCord;
	$yReport[0].textContent = pacmanObject.yCord;
	$faceReport[0].textContent = pacmanObject.finalDirection.toUpperCase();
})














