var fs   = require('fs');
var path = require('path');

var Collector = function () {
}
Collector.prototype.collect = function(root, option) {
	option     = option || {};
	option.abs = !!option.abs;
	option.ext = !option.ext ? [] : Array.isArray(option.ext) ? option.ext : [option.ext];

	var ary = [], queue = [root];
	while(queue.length > 0) {
		var folder = queue.shift();
		fs.readdirSync(folder).forEach(function (file) {
			var item = path.parse(file);
			var pathname = path.join(folder, file);

			if (fs.statSync(pathname).isDirectory()) {
				queue.push(pathname);

			} else if (option.ext.length == 0) {
				ary.push(pathname);

			} else if (option.ext.indexOf(item.ext) > -1) {
				ary.push(pathname);

			}

		}.bind(this));
	}

	return ary;
};

module.exports = new Collector();
