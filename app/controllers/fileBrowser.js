var args = arguments[0] || {},
	working = false,
	FS;


$.win.addEventListener('open', function(){
	setFileListing();
});

Ti.App.addEventListener('fileBrowser:rowClick', function(e){
	setFileListing(e.fs);
});


function choosePath() {
	if (FS && FS.getNativePath) {
		Ti.App.fireEvent('fileBrowser:selected', {fileBrowser: _.defaults(FS, args)});
		closeWindow();
	}
}

function listFiles(oFS, noHidden, noFile, noDir) {
	FS = oFS||Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory).getParent();
	var	np = FS.getNativePath(),
		ls = FS.getDirectoryListing(),
		up = FS.getParent(),
		ret = [{
			'fs': up,
			'icon': Alloy.Globals.icon.archive,
			'name': '..'
		}],
		i,
		f;
	
	try {
    	_.each(ls, function(e){
    		f = Ti.Filesystem.getFile(np+'/'+e);
    		i = (f.isFile())? Alloy.Globals.icon.info : Alloy.Globals.icon.archive;
    		
    		if (noHidden && (e.indexOf('.') === 0)) {
    			
    		} else if (noFile && f.isFile()) {
    			
    		} else if (noDir && f.isDirectory()) {
    			
    		} else {
    			ret.push({
    				'fs': f,
    				'icon': i,
    				'name': e
    			});
    		}
    	});
    } catch(e) {
        Ti.API.debug(JSON.stringify(e));
    }
	
	return ret;
}

function setTableData(aItems, sSort) {
	var rowControllers = [],
		sSort = sSort||'text';
	
	// Set header title
    $.path.text = (FS)? FS.nativePath.substr(7) : '';
    
    try {
    	// Create row controllers based on all models in the collection
    	_.each(aItems, function(i) {
            rowControllers.push(Alloy.createController('fileBrowserRow', i)); //JSON.parse(JSON.stringify(i))
        });
        
        // Sort controllers array by title
        rowControllers = _.sortBy(rowControllers, function(r){
            return r.text[sSort];
        });
        
        // Fill table with the controllers' TableViewRow
        $.table.setData(_.map(rowControllers, function(r){
            return r.getView();
        }));
    } catch(e) {
        Ti.API.debug(JSON.stringify(e));
    }
}

function setFileListing(oFS) {
	if (!working) {
		working = true;
		setTableData(listFiles(oFS||null, true, false, false));
		working = false;
	}
}

function closeWindow() {
	if (!working)
		Alloy.Globals.close($.win);
}