function updateSize() {
    const input = elements.sizeInput.value;

    if (input < 5 || input > 50) {
        fontSize = Math.min(Math.max(input, 5), 50);
        elements.sizeInput.value = fontSize;
    } else
        fontSize = input;
}

function switchFont() {
    matrixFont = checkboxes.matrixFont.checked;
}

function confirmSettings() {
    saveSettings();
    runMatrix();
}

function saveSettings() {
    setRequest("fontSize", fontSize);
    setRequest("matrixFont", matrixFont);
}