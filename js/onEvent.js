window.onload = function (e) {
    calculateTimeBar();

};

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    var errorText = 'ERROR : ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' +  errorObj;

    console.log(errorText);

    reportError(errorText);
    rLog(errorText);

    hLoadM();
    
    /*
    noty({
        layout: 'topRight',
        type: 'error',
        text: 'Erreur interne dans le script, "' + errorObj + '". Un message d\'erreur a été envoyé à nos serveurs.',
        timeout: '5000'
    });
    */
    
    return false;
};

window.onbeforeunload = function (e) {
    e = e || window.event;

    /*
    if(currentProject.isReady) {
        saveProject();
    }

    var msg = 'Voulez-vous quitter ? Des fichiers sont peut-être toujours en envoi vers le serveur.';

    if (e) {
        e.returnValue = msg;
    }

    return msg;
    */
};

window.onclick = function() {
    if(currentProject.isReady) {
        hideContextMenu();
    }
};

window.onmouseup = function(e) {
    if(currentProject.isReady) {
        analyzeCollision();
    }
};

window.onmousemove = function(e) {
    if(currentProject.isReady) {
        mouseMoveTracks(e);
    }
};

document.getElementById('audioView').onscroll = function() {
    //console.log(this.scrollLeft);

    document.getElementById('videoView').scrollLeft = this.scrollLeft;

    if(this.scrollLeft > scrollTracks)
    {
        scrollPlusTracks();
    }
    else
    {
        scrollLessTracks();
    }

    pixelTimeBar.g = this.scrollLeft;
    pixelTimeBar.d = 734 + this.scrollLeft;

    calculateTimeBar();
    drawElementsTracks();
};

document.getElementById('listFiles').ondragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
};

document.getElementById('listFiles').ondrop = function(e) {
    console.log('dropFile');

    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;

    if(files[0] != undefined)
    {
        addFile(files[0]);
    }
};

document.getElementById('tracks').addEventListener("DOMMouseScroll", function(e){
    var e = window.event || e;
    var delta = (e.wheelDelta || e.detail);
    if (delta>0)
    {
        document.getElementById('audioView').scrollLeft = document.getElementById('audioView').scrollLeft + 100;
    }
    else
    {
        if (document.getElementById('audioView').scrollLeft-100>0)
        {
            document.getElementById('audioView').scrollLeft = document.getElementById('audioView').scrollLeft - 100;
        }
        else
        {
            document.getElementById('audioView').scrollLeft = 0;
        }
    }

    return false;
});
document.getElementById('tracks').onmouseleave =  function(e){
    console.log("mouseLeave");
    window.removeEventListener('DOMMouseScroll',   preventDefault, false);
};
document.getElementById('tracks').onmouseenter = function(e){
    console.log("mouseEnter");
    window.addEventListener('DOMMouseScroll',  preventDefault, false);
};
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
};
