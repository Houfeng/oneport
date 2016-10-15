# 简介
一个用于获取空闲端口的小模块

# 安装
```sh
npm install oneport --save
```

# 使用

```js


//获取一个空闲的端口
oneport.acquire(function (err, port) {
  if (err) return console.error(err);
  console.log('port:', port);
});

let guid = '3aac50f1-bdb2-44c0-3eb0-228aa48bbf3a';

//获取一个端口，并指定一个「名称」
oneport.acquire(guid, function (err, port) {
  if (err) return console.error(err);
  console.log('port:', port);
});

//通过名称查询最后一次成功获取的端口
oneport.last(guid, function (err, port) {
  if (err) return console.error(err);
  console.log('port:', port);
});

```
