let ctx;
let cw, ch;
let xShift;

function initRender() {
    ctx = elements.canvas.getContext("2d");
    adaptRender();
}

function adaptRender() {
    cw = elements.canvas.width;
    ch = elements.canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    xShift = (cw - field[0].length * fontSize) / 2;
}

function render() {
    ctx.clearRect(0, 0, cw, ch);

    for (let y = 0, height = field.length; y < height; y++) {
        for (let x = 0; x < field[0].length; x++) {
            const character = field[y][x];

            if (character) {
                const posX = x * fontSize + xShift;
                const posY = y * fontSize;
                const isLeading = (field?.[y - 1]?.[x] && !field?.[y + 1]?.[x]);

                renderCharacter(character, posX, posY, isLeading);
            }
        }
    }
}

function renderCharacter(character, x, y, isLeading=false) {
    ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.shadowColor = "rgb(60,200,0)";
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = isLeading ? Math.ceil(fontSize / 5) : Math.ceil(fontSize / 7);
    ctx.fillStyle = isLeading ? "rgb(200,236,150)" : "rgb(60,200,0)";
    ctx.font = matrixFont ? `${fontSize}px matrix` : `${fontSize}px epic`
	
	ctx.fillText(character, x + fontSize/2, y + fontSize/2);
}