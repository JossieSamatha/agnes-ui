# agnes-ui

智能运营平台UI

## 安装依赖
```
npm -g install yarn

yarn install
```

### 本地运行
```
yarn serve
```

### 编译打包
```
yarn build
```

### [前端开发规范](http://wiki.goupwith.com/pages/viewpage.action?pageId=10683002)

#### 命名注意事项：
1. 以下情况使用小写字母+横杠分隔的kebab-case命名方式： 
> 文件夹&文件名
> 样式名
> 书写在template中的组件名

2. 以下情况使用小写开头的驼峰命名，Camel命名方式
> 方法名
> 变量名

3. Class命名使用大写开头的驼峰命名, Pascal命名方式：
> Class名

4. 全局/模块级的常量使用 大写、下划线分隔命名

#### 常用组件
1. gf-dict-select       字典下拉框
2. gf-dict-radio-group  字典选项组
3. dialog-footer        对话框底部操作栏
4. gf-grid              agGrid表格组件封装


#### 异常处理规范
```js
try {
    await this.$api.modelConfigApi.saveModel(this.form);
  
    this.$msg.success('保存成功');
    this.$dialog.close(this);
} catch (reason) {
    this.$msg.error(reason);
}  
```

#### 提交时使用遮罩
1. 全局遮罩       this.$app.blockingApp(p)
2. 当前页面遮罩    this.$app.blockingView(p)
```js
try {
    const p = this.$api.modelConfigApi.saveModel(this.form);
    await this.$app.blockingApp(p);
 
    this.$msg.success('保存成功');
    this.$dialog.close(this);
} catch (reason) {
    this.$msg.error(reason);
}

```

#### 其他注意事项
1. 使用=== 替代== 判断相等操作，且保证变量类型相同
2. 尽量使用 async/await语法，避免过多的Promise的回调嵌套
3. 空值判断的代码优化：
```
...
if (x!=='' && x!==null && x!==undefined)  等同于  if (x)

...
if (!x){
    x="0"
}
等同于
x = x || '0'  

```

4. 使用lodash工具类方法，避免重复造轮子
[参考链接](https://www.lodashjs.com/)





