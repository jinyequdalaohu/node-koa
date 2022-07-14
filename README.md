## 一.项目的初始化

### 1.npm 初始化

 ``` js 
 npm init -y
 ```

生成 package.json

### 2 git初始化

``` js
git init
```

生成 git 隐藏文件夹。

### 3 创建ReadMe 文件

## 二.搭建项目

安装 dotenv。读取根目录中的.env 文件，将配置写到process.env中

``` js
npm install dotenv
```

创建 .env 文件

创建 src/config/config.default.js  配置环境变量

## 三.项目基本优化

### 1 自动重启

安装nodemon 模块实现自动重启，在package.json 中配置启动命令即可

``` js 
npm install nodemon -D	将nodemon安装到项目中

例：
 "scripts": {
    "start": "node src/app.js",
    "serve": "nodemon src/app.js"
  },
```

## 四.添加路由

### 1.安装 koa-router

路由，根据不同的url ，调整对应处理函数

``` js 
npm install koa-router
```

步骤：

	1. 导入包
	1. 实例化对象
	1. 编写路由
	1. 注册中间件

### 2. 编写路由

创建一个routes 的文件夹。对路由进行统一管理

### 3.在 app.js 中修改路由的引入



## 五.目录结构优化

### 1.将 http 服务和 app 业务拆分

创建 src/app/index.js

``` js
const koa = require("koa");

const userRouter = require("../routes/user");

const app = new koa();

app.use(userRouter.routes());

module.exports = app;
```

改造 app.js

### 2.将路由和控制器拆分

路由：解析url，分布给控制器对应的方法

控制器：处理不同的业务

改写 user.route.js

``` js
const Route = require('koa-router');

const {register, login} = require('../controller/user.controller')

const router = new Route({ prefix: "/users" });

//  注册接口
router.post('/register', register)

// 登录接口
router.post('/login', login)

module.exports = router
```

创建 controller/user.controller.js

``` js
class UserController {
    async register(ctx,next) {
        ctx.body = '注册成功'
    }

    async login(ctx,next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()
```

## 六.解析body

### 1.安装koa-body

``` js  
npm i koa-body
```

### 2.注册中间件

改写 app/index.js

``` js
const KoaBody = require("koa-body");	//注册

app.use(KoaBody());		// 引用
```

### 3.解析数据

改写 user.controller.js

```js 
const { createUser } = require('../services/user.services')

class UserController {
    async register(ctx,next) {
        // 1.获取数据
        // console.log(ctx.request.body)
        const { user_name, password } = ctx.request.body
        // 2.操作数据库  在services层中操作
        const res = await createUser(user_name, password);
        console.log(res,'123')
        // 3.返回结果
        ctx.body = ctx.request.body
    }

    async login(ctx,next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()
```

### 4.拆分service层，处理数据库

```js 
class UserService {
    async createUser(user_name, password) {
        // todo: 写入数据库
        return '写入成功'
    }
}

module.exports = new UserService()
```

## 7.数据库操作

sequelize ORM数据库工具

ORM：对象关系映射（面向对象的方法去操作数据库）

 	1. 数据表映射一个类
 	2. 数据表中的数据行对应一个对象
 	3. 数据表的字段对应对象的属性
 	4. 数据表的操作对应对象的方法

### 1.安装sequelize 

``` js
npm i sequelize mysql12
```

### 2.连接数据库

src/db/seq.js

``` js 
const {Sequelize} = require('sequelize')

const { MYSQL_HOST,
MYSQL_USER,
MYSQL_PWD,
MYSQL_DB} = require('../config/config.default')
// 在env中配置对应变量。使用变量进行数据库的链接

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: "mysql",
});

// 测试数据库是否连接成功
seq.authenticate().then(() => {
    console.log('链接成功')
}).catch((err) => {
    console.log('链接失败', err)
})

module.exports = seq
```

env文件中的变量

``` js
APP_PORT = 9837

MYSQL_HOST = localhost

MYSQL_USER = 账号

MYSQL_PWD = 密码

MYSQL_DB = 表名称
```

### 3.

## 十四用户的认证与授权

登录成功后，服务端给用户颁发一个token，用户在以后的每一次请求中携带这个token

jwt：json web token

+ header：头部
+ payload：载荷
+ signature：签名

### 1.安装jsonwebtoken

``` js 
npm i jsonwebtoken
```



