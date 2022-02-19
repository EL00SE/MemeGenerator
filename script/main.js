'use strict'
var gElCanvas;
var gCtx;
var gElImg;

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
}

function openEditor(elImg) {
    var elModal = document.querySelector('.meme-modal').classList.remove('hidden');
    gElImg = elImg;
    restoreToDefault();
    renderCanvas();
    addHighLighter();
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    drawImg(gElImg);
    drawLines();
}

function drawLines() {
    var lines = getLines();
    lines.forEach(({ color, stroke, size, font, txt, pos }) => {
        gCtx.beginPath();
        gCtx.strokeStyle = stroke;
        gCtx.fillStyle = color;
        gCtx.font = size + 'px ' + font;
        gCtx.textAlign = pos.x;
        gCtx.lineWidth = size / 10;
        gCtx.strokeText(txt, gElCanvas.width / 2, pos.y)
        gCtx.fillText(txt, gElCanvas.width / 2, pos.y);
        gCtx.closePath();
    })
}

function onDownload(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}