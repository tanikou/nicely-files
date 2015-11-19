var fs   = require('fs');
var path = require('path');

var Collector = function () {
}
Collector.prototype.collect = function(root, option) {
	var o = option || {};
	o.abs = !!o.abs;
	o.level = isNaN(o.level) ? -1 : o.level;
	o.ext = !o.ext ? [] : Array.isArray(o.ext) ? o.ext : [o.ext];
	o.not = !o.not ? [] : Array.isArray(o.not) ? o.not : [o.not];
	//o.each = function (file) { return true; };

	function match (ary, name) {
		return ary.some(function (ext) {
			// 判断文件名是否是此后缀
			return name.indexOf(ext, name.length - ext.length) !== -1;
		});
	}

	var ary = [], queue = [root];
	while(queue.length > 0) {
		var folder = queue.pop();
		fs.readdirSync(folder).forEach(function (file) {
			var pathname = path.join(folder, file);

			if (fs.statSync(pathname).isDirectory()) {
				if (-1 == o.level) { queue.push(pathname) };
				return;
			}
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
Collector.prototype.all = function (root, option) {
	option = option || {};
	option.level = -1;
	return this.collect(root, option);
}
Collector.prototype.top = function (root, option) {
	option = option || {};
	option.level = 0;
	return this.collect(root, option);
}

module.exports = new Collector();
