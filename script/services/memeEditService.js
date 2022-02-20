'use strict'

var gCurrLineNumber = 0;
var gLineAmmount = 2;
var gLines = [{
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
    gCurrLineNumber = 0;
    gLineAmmount = 2;
}


function setPosY(idx, diff) {
    gLines[idx].pos.y += diff;
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

function cycleLine() {
    if (gLineAmmount === 0) return false;
    if (gCurrLineNumber === gLineAmmount - 1) {
        gCurrLineNumber = 0;
    } else { gCurrLineNumber++; }
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
    gLines.sort((a, b) => a.pos.y - b.pos.y);
}

function removeLine(idx) {
    if (gLineAmmount === 0) return;
    gLines.splice(idx, 1);
    gLineAmmount--;
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

function getCanvasContainer() {
    return document.querySelector('.canvas-container');
}

function getCanvas() {
    return document.querySelector('canvas');
}