做这个是原因是因为我在项目中注册express路由是是注册routes文件夹下所有的路由，还有就是项目需要把views下的所有js全部全部bowersify和uglify。**所以我需要取得某文件夹下的某文件,包括子目录下的文件**，所以我写了这个 **nicely-files** 的小东西

```javascript 
npm intall nicely-files
```

收集views文件夹下所有的js文件，但是排除.min.js
```javascript
var files = require('nicely-files');
var ary   = files.all('./views', {'ext':['.js'], 'not':['.min.js']});
console.log(ary);
```
option可有以下参数
* ext，需要收集的文件后缀，可是字符串也可以是数组
* not，需要排除的文件后缀
* each，每一个文件都会先调用**方法**（如果存在），如果返回为false那么忽略此文件

可使用方法有
* all 收集根目录下所有文件，包括子目录
* top 只收集根目录下的文件，不包括子目录
