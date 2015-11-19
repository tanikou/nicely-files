var files = require('./index');
var path  = require('path');

var root  = path.resolve('./');
console.log('检索根目录：', root);
console.log(files.collect(root));