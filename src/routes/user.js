const Route = require('koa-router');

// 导入中间件
const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware")

const {register, login} = require('../controller/user.controller')

const router = new Route({ prefix: "/users" });

//  注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

// 修改密码
router.patch("/", auth, (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = '修改密码成功'
});

module.exports = router