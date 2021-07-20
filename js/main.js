let elements = {};
let checkboxes = {};

let characters = "";
let fontSize = 42;
let matrixFont = false;

function init() {
	elements = {
		'charactersInput': document.querySelector(".characters-input"),
		'inputInfo': document.querySelector(".input-info"),
		'characters': document.querySelector('.characters'),
		'sizeInput': document.querySelector('.characters-size-input'),
		'canvas': document.querySelector('#canvas-matrix')
	};

	checkboxes = {
		'screen': {
			'input': document.querySelector("#screen-input-radio"),
			'settings': document.querySelector("#screen-settings-radio"),
			'matrix': document.querySelector("#screen-matrix-radio")
		},
		'charactersInput': document.querySelector("#characters-input-checkbox"),
		'correction': document.querySelector("#characters-correction-checkbox"),
		'correctionInfo': document.querySelector("#characters-correction-info-checkbox"),
		'matrixFont': document.querySelector("#matrix-font-checkbox"),
		'pause': document.querySelector("#pause-checkbox")
	};

	elements.canvas.width = window.innerWidth;
	elements.canvas.height = window.innerHeight;

	syncSettings();
}

function resize() {
	if (elements) {
		elements.canvas.width = window.innerWidth;
		elements.canvas.height = window.innerHeight;
		
		if (checkboxes?.screen.matrix.checked)
			resizeMatrix();
	}
}

async function syncSettings() {
	//
}

async function request() {
	//
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}