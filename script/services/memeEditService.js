'use strict'

var gCurrLineNumber = 0;
var gLineAmmount = 2;
var gLines;

function restoreToDefault() {
    gLines = [{
            color: 'white',
            stroke: 'black',
            size: 30,
            font: 'Impact',
            txt: 'Enter text',
            pos: {
                x: 'center',
                y: 30,
            }
        },
        {
            color: 'white',
            stroke: 'black',
            size: 30,
            font: 'Impact',
            txt: 'Enter Text',
            pos: {
                x: 'center',
                y: getCanvas().height - 30
            }
        }
    ];
}

function setColor(idx, color) {
    gLines[idx].color = color;
}

function setStroke(idx, stroke) {
    gLines[idx].stroke = stroke;
}

function setFont(idx, font) {
    gLines[idx].font = font;
}

function setTxt(idx, txt) {
    gLines[idx].txt = txt;
}

function selectLineUp() {
    if (gLineAmmount === 0) return false;
    if (gCurrLineNumber === 0) {
        gCurrLineNumber = gLineAmmount - 1;
    } else gCurrLineNumber--;
    return true;
}

function selectLineDown() {
    if (gLineAmmount === 0) return false;
    if (gCurrLineNumber === gLineAmmount - 1) {
        gCurrLineNumber = 0;
    } else gCurrLineNumber++;
    return true;
}

function addLine(color = 'white', stroke = 'black', size = 30, font = 'Impact', txt = 'enter text') {
    var posY;
    if (gLineAmmount > 1) posY = getCanvas().height / 2 + size * (gLineAmmount - 3);
    else if (gLineAmmount === 1) posY = getCanvas().height - size;
    else posY = size;
    var pos = { x: 'center', y: posY }
    gLines.splice(gLineAmmount - 1, 0, { color, stroke, size, font, txt, pos });
    gLineAmmount++;
    // gLines.sort((a, b) => a.pos - b.pos);
}

function removeLine(idx) {
    if (gLineAmmount === 0) return;
    gLines.splice(idx, 1);
    gLineAmmount--;
    console.log(gLineAmmount);
}

function fontSizeUp(idx) {
    if (gLines[idx].size < 40)
        gLines[idx].size += 5;
}

function fontSizeDown(idx) {
    if (gLines[idx].size > 5)
        gLines[idx].size -= 5;
}

function switchToLTR(idx) {
    gLines[idx].pos.x = 'right';
}

function switchToCenter(idx) {
    gLines[idx].pos.x = 'center';
}

function switchToRTL(idx) {
    gLines[idx].pos.x = 'left';
}

function selectFont(elSelect) {
    setFont(gCurrLineNumber, elSelect.value);
}

function fontColor(elColorInput) {
    setColor(gCurrLineNumber, elColorInput.value);
}

function strokeColor(elStrokeColorInput) {
    setStroke(gCurrLineNumber, elStrokeColorInput.value);
}

function shareMeme() {

}

function uploadMeme() {

}

function getLines() {
    return gLines;
}

function setLineNumber(number) {
    gLineAmmount = number;
}

function getLineNumber() {
    return gLineAmmount;
}

function setCurrLineNumber(number) {
    gCurrLineNumber = number;
}

function getCurrLineNumber() {
    return gCurrLineNumber;
}

function getCanvas() {
    return document.querySelector('canvas');
}