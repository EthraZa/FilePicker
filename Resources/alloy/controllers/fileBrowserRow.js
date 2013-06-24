function Controller() {
    function rowClick() {
        Ti.App.fireEvent("fileBrowser:rowClick", args);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    rowClick ? $.__views.row.addEventListener("click", rowClick) : __defers["$.__views.row!click!rowClick"] = true;
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId1"
    });
    $.__views.row.add($.__views.__alloyId1);
    $.__views.img = Ti.UI.createImageView({
        left: "2dp",
        right: "2dp",
        width: "24dp",
        height: "24dp",
        id: "img"
    });
    $.__views.__alloyId1.add($.__views.img);
    $.__views.text = Ti.UI.createLabel({
        font: {
            fontSize: "16dp"
        },
        left: "2dp",
        id: "text"
    });
    $.__views.__alloyId1.add($.__views.text);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.img.image = args.icon || Alloy.Globals.icon.archive;
    $.text.text = args.name || "";
    __defers["$.__views.row!click!rowClick"] && $.__views.row.addEventListener("click", rowClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;