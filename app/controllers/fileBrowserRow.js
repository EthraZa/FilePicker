var args = arguments[0] || {};

$.img.image = args.icon||Alloy.Globals.icon.archive;
$.text.text = args.name||'';

function rowClick(o){
	Ti.App.fireEvent('fileBrowser:rowClick', args);
}