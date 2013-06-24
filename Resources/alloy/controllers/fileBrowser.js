function Controller() {
    function choosePath() {
        if (FS && FS.getNativePath) {
            Ti.App.fireEvent("fileBrowser:selected", {
                fileBrowser: _.defaults(FS, args)
            });
            closeWindow();
        }
    }
    function listFiles(oFS, noHidden, noFile, noDir) {
        FS = oFS || Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).getParent();
        var i, f, np = FS.getNativePath(), ls = FS.getDirectoryListing(), up = FS.getParent(), ret = [ {
            fs: up,
            icon: Alloy.Globals.icon.archive,
            name: ".."
        } ];
        try {
            _.each(ls, function(e) {
                f = Ti.Filesystem.getFile(np + "/" + e);
                i = f.isFile() ? Alloy.Globals.icon.info : Alloy.Globals.icon.archive;
                noHidden && 0 === e.indexOf(".") || noFile && f.isFile() || noDir && f.isDirectory() || ret.push({
                    fs: f,
                    icon: i,
                    name: e
                });
            });
        } catch (e) {
            Ti.API.debug(JSON.stringify(e));
        }
        return ret;
    }
    function setTableData(aItems, sSort) {
        var rowControllers = [], sSort = sSort || "text";
        $.path.text = FS ? FS.nativePath.substr(7) : "";
        try {
            _.each(aItems, function(i) {
                rowControllers.push(Alloy.createController("fileBrowserRow", i));
            });
            rowControllers = _.sortBy(rowControllers, function(r) {
                return r.text[sSort];
            });
            $.table.setData(_.map(rowControllers, function(r) {
                return r.getView();
            }));
        } catch (e) {
            Ti.API.debug(JSON.stringify(e));
        }
    }
    function setFileListing(oFS) {
        if (!working) {
            working = true;
            setTableData(listFiles(oFS || null, true, false, false));
            working = false;
        }
    }
    function closeWindow() {
        working || Alloy.Globals.close($.win);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "#000",
        borderWidth: 1,
        borderColor: "#393c39",
        height: "97%",
        width: "97%",
        borderRadius: 3,
        opacity: .98,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.btnBar = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "btnBar"
    });
    $.__views.win.add($.__views.btnBar);
    $.__views.btnBack = Ti.UI.createButton({
        title: L("back"),
        top: 0,
        left: 0,
        id: "btnBack"
    });
    $.__views.btnBar.add($.__views.btnBack);
    closeWindow ? $.__views.btnBack.addEventListener("click", closeWindow) : __defers["$.__views.btnBack!click!closeWindow"] = true;
    $.__views.__alloyId0 = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        text: L("picker"),
        id: "__alloyId0"
    });
    $.__views.btnBar.add($.__views.__alloyId0);
    $.__views.btnOk = Ti.UI.createButton({
        title: L("ok"),
        top: 0,
        right: 0,
        id: "btnOk"
    });
    $.__views.btnBar.add($.__views.btnOk);
    choosePath ? $.__views.btnOk.addEventListener("click", choosePath) : __defers["$.__views.btnOk!click!choosePath"] = true;
    $.__views.path = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        left: "7dp",
        right: "7dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "path"
    });
    $.__views.win.add($.__views.path);
    $.__views.table = Ti.UI.createTableView({
        top: 0,
        bottom: 0,
        minRowHeight: "40dp",
        id: "table"
    });
    $.__views.win.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var FS, args = arguments[0] || {}, working = false;
    $.win.addEventListener("open", function() {
        setFileListing();
    });
    Ti.App.addEventListener("fileBrowser:rowClick", function(e) {
        setFileListing(e.fs);
    });
    __defers["$.__views.btnBack!click!closeWindow"] && $.__views.btnBack.addEventListener("click", closeWindow);
    __defers["$.__views.btnOk!click!choosePath"] && $.__views.btnOk.addEventListener("click", choosePath);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;