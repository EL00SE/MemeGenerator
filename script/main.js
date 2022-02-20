'use strict'
var gElCanvas;
var gCtx;
var gElImg;
const STORAGE_KEY = 'meme-db';
var memes = loadFromStorage(STORAGE_KEY);

function init() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    restoreToDefault();
}

function openEditor(elImg) {
    var elModal = document.querySelector('.meme-modal').classList.remove('hidden');
    gElImg = elImg;
    restoreToDefault();
    renderCanvas();
}


function renderCanvas() {
    // resizeCanvas();
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    drawImg(gElImg);
    drawLines();
    addHighLighter();
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
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    drawImg(gElImg);
    drawLines();
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function onSave() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    drawImg(gElImg);
    drawLines();
    const data = gElCanvas.toDataURL();
    memes.push(data);
    saveToStorage(STORAGE_KEY, memes);
}

function onShare() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    drawImg(gElImg);
    drawLines();
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        var btn = document.querySelector('.share-btn');
        btn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`;
        btn.title = "Share on Facebook";
        btn.target = "_blank";
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`);

    }
    doShare(imgDataUrl, onSuccess);
}

function doShare(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function drawImg(elImg) {
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onClose() {
    var elModal = document.querySelector('.meme-modal').classList.add('hidden');
}

function toggleMenu() {
    document.body.classList.toggle("menu-open");
}

// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-container')
//     gElCanvas.width = elContainer.offsetWidth;
//     gElCanvas.height = elContainer.offsetHeight;
// }

function onMemeTextChange(elTextInput) {
    setTxt(getCurrLineNumber(), elTextInput.value);
    renderCanvas();
}

function onMoveLineUp() {
    setPosY(getCurrLineNumber(), -5);
    renderCanvas()
}

function onMoveLineDown() {
    setPosY(getCurrLineNumber(), 5);
    renderCanvas();
}

function onCycle() {
    if (cycleLine())
        renderCanvas()

}

function addHighLighter() {
    var lines = getLines();
    var line = lines[getCurrLineNumber()];
    gCtx.beginPath();
    gCtx.rect(line.size, line.pos.y - line.size - 5, gElCanvas.width - line.size * 2, line.size * 1.5);
    gCtx.strokeStyle = '#f26c6c';
    gCtx.stroke();
    gCtx.closePath();
}


function onAddLine() {
    addLine();
    renderCanvas();
}

function onRemoveLine() {
    removeLine(getCurrLineNumber());
    renderCanvas();
}

function onRestore() {
    restoreToDefault();
    setCurrLineNumber(0);
    setLineNumber(2);
    renderCanvas();
    addHighLighter();
}

function onFontSizeUp() {
    fontSizeUp(getCurrLineNumber());
    renderCanvas();
}

function onFontSizeDown() {
    fontSizeDown(getCurrLineNumber());
    renderCanvas();
}

function onLtrText() {
    switchToLTR(getCurrLineNumber());
    renderCanvas();
}

function onCenterText() {
    switchToCenter(getCurrLineNumber());
    renderCanvas();
}

function onRtlText() {
    switchToRTL(getCurrLineNumber());
    renderCanvas();
}

function onFontSelect(elSelect) {
    selectFont(elSelect);
    renderCanvas();
}

function onFontColor(elColorInput) {
    fontColor(elColorInput);
    renderCanvas();
}

function onStrokeColor(elStrokeColorInput) {
    strokeColor(elStrokeColorInput);
    renderCanvas();
}