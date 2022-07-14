// 导入jwt包
const jwt = require("jsonwebtoken");

const { createUser, getUserInfo } = require("../service/user.service");

const { userRegistrationError } = require("../constant/err.type");

const { JWT_SECRET } = require("../config/config.default");

class UserController {
  async register(ctx, next) {
    // 1.获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body;

    // 2.操作数据库  在services层中操作
    try {
      // 3.返回结果
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 0,
        message: "注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (err) {
      console.log(err);
      ctx.app.error("error", userRegistrationError, ctx);
    }
  }
  // 登录成功
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    // 1.获取用户信息。在token的 payload 中记录 id,user_name, is_admin
    try {
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        },
      };
    } catch (err) {
      console.error('用户登录失败', err);
    }
  }
}

module.exports = new UserController();
