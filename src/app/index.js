const path = require('path');

const koa = require("koa");
const KoaBody = require("koa-body");
const parameter = require("koa-parameter");
// 静态资源
const KoaStatic = require("koa-static");

const router = require("../routes")
const errHandler = require("./errHandler")

// const userRouter = require("../routes/user");
// const goodsRouter = require("../routes/goods.route");

const app = new koa();

app.use(KoaBody({
    multipart: true,
    formidable: {
        // 写绝对路径，不写相对路径
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true,
    }
}));

app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on("error", errHandler);

module.exports = app;