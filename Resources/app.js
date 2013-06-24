var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.icon = {
    paste: "/images/ic_menu_paste.png",
    archive: "/images/ic_menu_archive.png",
    del: "/images/ic_menu_delete.png",
    add: "/images/ic_menu_add.png",
    find: "/images/ic_menu_find.png",
    info: "/images/ic_menu_info_details.png",
    download: "/images/ic_menu_upload.png",
    settings: "/images/ic_sysbar_quicksettings.png",
    block: "/images/ic_menu_block.png",
    "goto": "/images/ic_menu_goto.png"
};

Alloy.Globals.close = function(win) {
    win && win.close && win.close();
    win = null;
};

Alloy.createController("index");