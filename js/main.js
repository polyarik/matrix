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
		'inputError': document.querySelector("#input-error-checkbox"),
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
		const width = window.innerWidth;
		const height = window.innerHeight;
		const scale = window.devicePixelRatio;

		elements.canvas.style.width = width + "px";
		elements.canvas.style.height = height + "px";

		elements.canvas.width = Math.floor(width * scale);
		elements.canvas.height = Math.floor(height * scale);

		if (checkboxes?.screen.matrix.checked)
			resizeMatrix();
	}
}

async function syncSettings() {
	const settings = await getRequest("all");

	if (settings.characters && !elements.charactersInput.value) {
		elements.charactersInput.value = settings.characters;
		updateInput();
	}

	if (settings.fontSize) {
		elements.sizeInput.value = settings.fontSize;
		updateSize();
	}

	if (settings.matrixFont) {
		checkboxes.matrixFont.checked = true;
		matrixFont = true;
	}
}

async function setRequest(key, value) {
	let data = `set=${key}&${key}=${value}`;

	await fetch(`functions.php?${data}`);
}

async function getRequest(key=null) {
	let data = `get=${key}`;

	const response = await fetch(`functions.php?${data}`);
	const result = await response.json();

	return result;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}