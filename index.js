var fs   = require('fs');
var path = require('path');

var Collector = function () {
}
Collector.prototype.collect = function(root, option) {
	var o = option || {};
	o.abs  = !!o.abs;
	o.ext  = !o.ext ? [] : Array.isArray(o.ext) ? o.ext : [o.ext];
	o.not  = !o.not ? [] : Array.isArray(o.not) ? o.not : [o.not];
	//o.each = function (file) { return true; };

	function match (ary, name) {
		return ary.some(function (ext) {
			// 判断文件名是否是此后缀
			return name.indexOf(ext, name.length - ext.length) !== -1;
		});
	}

	var ary = [], queue = [root];
	while(queue.length > 0) {
		var folder = queue.shift();
		fs.readdirSync(folder).forEach(function (file) {
			var item = path.parse(file);
			var pathname = path.join(folder, file);

			if (fs.statSync(pathname).isDirectory()) { queue.push(pathname); return; }
			if (o.each && false === o.each(pathname)) { return; }

			if (o.ext.length == 0) {
			} else if (match(o.ext, file)) {
			} else { return; }

			if (match(o.not, file)) { return; }

			ary.push(pathname);

		}.bind(this));
	}

	return ary;
};

module.exports = new Collector();
