'use strict'

function onMemeTextChange(elTextInput) {
    setTxt(getCurrLineNumber(), elTextInput.value);
    renderCanvas();
    addHighLighter();
}

function onSwitchUp() {
    if (selectLineUp())
        addHighLighter();
}

function onSwitchDown() {
    if (selectLineDown())
        addHighLighter();
}

function addHighLighter() {
    const elHighlighter = document.querySelector('.highlighter');
    var lines = getLines();
    elHighlighter.style.width = (getCanvas().width - 30) + 'px';
    elHighlighter.style.height = (lines[getCurrLineNumber()].size + 5) + 'px';
    elHighlighter.classList.add('border');
    elHighlighter.style.top = (lines[getCurrLineNumber()].pos.y - lines[getCurrLineNumber()].size + 2) + 'px';
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
    setCurrLineNumber(1);
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

function onColorSelect(elColorInput) {

}