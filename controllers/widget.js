var args = $.args;
var body;

init();
function init() {
    var exclude = [
		'id', 'children',
        'tapOutsideToHideDialog', 'url', 'data'
	];
	$.win.applyProperties(_.omit(args, exclude));

    body = Alloy.createController(args.url, args.data);
    body.on('done', hideDialog);
    $.win.add( body.getView() );
    args.data = null;
}

exports.show = function() {
    $.win.open();
};

function winOpen(e) {
    $.win.animate({ opacity: 1, duration: 400 }, function() {
        body && body.load && body.load();
    });
}

function winClose() {
    if (body) {
        body.unload && body.unload();
        body = null;
    }
}

function hideDialog(e) {
    if (e._hideDialog !== false) {
        $.win.animate({ opacity: 0, duration: 400 }, function() {
            $.win.close();
        });
        delete e._hideDialog;
    }
    $.trigger('done', e);
}
