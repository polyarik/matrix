let field = [];
let interval;
const delay = 60;

function runMatrix() {
    checkboxes.pause.checked = false;

    field = createField();
    initRender();

    startInterval();
}

function resizeMatrix() {
    field = createField(field);

    adaptRender();
    render();
}

function createField(oldField=null) {
    const width = Math.floor(elements.canvas.width / fontSize);
    const height = Math.ceil(elements.canvas.height / fontSize);

    let newField = [];

    for (let y = 0; y < height; y++) {
        newField[y] = [];

        for (let x = 0; x < width; x++) {
            if (oldField?.[y]?.[x])
                newField[y][x] = oldField[y][x];
            else
                newField[y][x] = null;
        }
    }

    return newField;
}

function startInterval() {
    clearInterval(interval);

    interval = setInterval(() => {
        if (!checkboxes.pause.checked) {
            moveField();
            addCharacters();
            render();
        } else
            clearInterval(interval);
    }, delay);
}

function pause(toggle=false) {
    if (toggle)
        checkboxes.pause.checked = !checkboxes.pause.checked;

    if (!checkboxes.pause.checked)
        startInterval();
}

function moveField() {
    for (let y = field.length - 1; y > 0; y--) {
        for (let x = 0, width = field[y - 1].length; x < width; x++) {
            field[y][x] = field[y - 1][x];
        }
    }

    field[0].fill(null);
}

function addCharacters() {
    const newCharactersCount = getRandomInt(0, Math.floor(field[0].length / 2));

    for (let i = 0; i < newCharactersCount; i++) {
        const inColumn = !getRandomInt(0, 2);
        let positions = [];
        let x;

        if (inColumn && field[1]) {
            positions = field[1].reduce((acc, character, i) => {
                if (character) acc.push(i);
                return acc;
            }, []);
        }

        if (positions.length)
            x = positions[ getRandomInt(0, positions.length - 1) ];
        else
            x = getRandomInt(0, field[0].length - 1);

        const character = characters[ getRandomInt(0, characters.length - 1) ];
        field[0][x] = character;
    }
}