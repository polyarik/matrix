function updateInput() {
    const input = elements.charactersInput.value;
    elements.inputInfo.innerText = `${input.length}/50`;

    if (input.length) {
        characters = validateCharacters(input);
        checkboxes.correction.checked = (characters !== input.toUpperCase());

        checkboxes.charactersInput.checked = true;
    } else
        clearInput();
}

function validateCharacters(characters) {
    characters = characters.toUpperCase();
    characters = characters.replace('Ё', 'Е');
    characters = characters.replace(/[^A-ZА-Я0-9]/g, '');

    return characters;
}

function clearInput() {
    elements.charactersInput.value = "";
    elements.inputInfo.innerText = "0/50";
    characters = "";

    checkboxes.charactersInput.checked = false;
    checkboxes.correction.checked = false;
    checkboxes.correctionInfo.checked = false;
}

function chooseCharacters() {
    if (characters.length) {
        saveCharacters();

        elements.characters.innerText = characters;
        checkboxes.screen.settings.checked = true;
    } else {
        //TODO: animation
    }
}

function saveCharacters() {
    //request
}