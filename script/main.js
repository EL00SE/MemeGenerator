'use strict'
var gElCanvas;
var gCtx;
var gElImg;

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
}

function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}


function openEditor(elImg) {
    var elModal = document.querySelector('.meme-modal').classList.remove('hidden');
    gElImg = elImg;
    drawImg(elImg);
}

function memeTextOnchange() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height); //preventing text stacking
    drawImg(gElImg); //preventing text stacking
    var elInput = document.querySelector('.meme-text');
    var elInputVal = elInput.value;
    var elFontFam = document.querySelector('.font-select').value; //on text change, update canvas
    // var elMemeText = document.querySelector('.canvas-text');
    // elMemeText.innerText = elInputVal;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '30px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(elInputVal, gElCanvas.width / 2, 30);
    gCtx.strokeText(elInputVal, gElCanvas.width / 2, 30);
    //text on canvas
}

function onDownload(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}