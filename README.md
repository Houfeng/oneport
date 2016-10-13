# 简介
用于获取一个空闲的端口的小模块

# 安装
```sh
npm install oneport --save
```

# 使用
```js
oneport(function(err,port){
  if(err) return console.error(err);
  console.log('port:', port);
});
```
