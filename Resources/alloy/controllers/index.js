function Controller() {
    function openBrowser() {
        var browser = Alloy.createController("fileBrowser", {
            ctrl: $.id
        }).getView();
        browser.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        layout: "vertical",
        fullscreen: false,
        exitOnClose: true,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.pathLbl = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        text: "Click here to pick a file or folder...",
        id: "pathLbl"
    });
    $.__views.win.add($.__views.pathLbl);
    openBrowser ? $.__views.pathLbl.addEventListener("click", openBrowser) : __defers["$.__views.pathLbl!click!openBrowser"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.App.addEventListener("fileBrowser:selected", function(e) {
        var f = e.fileBrowser;
        f && f.nativePath && f.ctrl == $.id && ($.pathLbl.text = f.nativePath.substr(7));
    });
    $.win.open();
    __defers["$.__views.pathLbl!click!openBrowser"] && $.__views.pathLbl.addEventListener("click", openBrowser);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;