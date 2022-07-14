const bcrypt = require('bcryptjs')
const { getUserInfo } = require("../service/user.service");

const {
  userFormateError,
  userAlreadyExisted,
  userRegistrationError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require("../constant/err.type");

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  // 合法性
  if (!user_name || !password) {
    console.error("用户名或者密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  // 合理性
  // 用户已存在时不需要再次注册
  //   if (await getUserInfo({ user_name })) {
  //     ctx.app.emit("error", userAlreadyExisted, ctx);
  //     return;
  //   }
  try {
    const res = await getUserInfo({user_name})
    if(res) {
        console.err('用户名已经存在', {user_name})
        ctx.app.emit("error", userAlreadyExisted, ctx);
        return;
    }
  } catch (err) {
      console.error('获取用户信息错误', err);
      ctx.app.emit("error", userRegistrationError, ctx);
      return;
  }
  await next();
};

// 加密密码
const cryptPassword = async (ctx, next) => {
  const {password} = ctx.request.body
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash;
  await next();
}

// 验证登录
const verifyLogin = async (ctx, next) => {
  // 1.根据用户名查询用户是否存在（不存在抛出错误）
  const {user_name, password} = ctx.request.body;
  try{
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error("用户名不存在", { user_name });
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }
    // 2.用户名存在时密码是否匹配（不匹配抛出错误）
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch(err){
    console.error(err)
    return ctx.app.emit("error", userLoginError, ctx);
  }
  await next();
}

module.exports = { userValidator, verifyUser, cryptPassword, verifyLogin };
