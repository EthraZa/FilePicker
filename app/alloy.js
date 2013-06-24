// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Alloy.Globals.icon = {
    'paste': '/images/ic_menu_paste.png',
    'archive': '/images/ic_menu_archive.png',
    'del': '/images/ic_menu_delete.png',
    'add': '/images/ic_menu_add.png',
    'find': '/images/ic_menu_find.png',
    'info': '/images/ic_menu_info_details.png',
    'download': '/images/ic_menu_upload.png',
    'settings': '/images/ic_sysbar_quicksettings.png',
    'block': '/images/ic_menu_block.png',
    'goto': '/images/ic_menu_goto.png'
};

/**
 * Close a Window and clean up used memory
 * @param {Object} win
 */
Alloy.Globals.close = function(win) {
    if (win && win.close) {
        win.close();
    }
    win = null;
};