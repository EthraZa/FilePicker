function openBrowser() {
    var browser = Alloy.createController('fileBrowser', {ctrl: $.id}).getView();
    browser.open();
}

Ti.App.addEventListener('fileBrowser:selected', function(e){
    var f = e.fileBrowser;
    
    if (f && f.nativePath && (f.ctrl == $.id)) {
        $.pathLbl.text = f.nativePath.substr(7);
    }
});

$.win.open();
