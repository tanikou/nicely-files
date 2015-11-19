var files = require('./index');
var path  = require('path');

var root  = path.resolve('./');
var start = new Date();
var ary   = files.collect(root);
console.log(ary);
console.log('检索根目录：%s。结果：%s。花费时间：%s毫秒', root, ary.length, new Date() - start);
