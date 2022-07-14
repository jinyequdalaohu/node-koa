const fs = require("fs");

const Router = require("koa-router");
const router = new Router();

// 拿到当前文件夹内所以文件名
fs.readdirSync(__dirname).forEach((file) => {
  // console.log(file)
  if (file != "index.js") {
    let r = require("./" + file);
    router.use(r.routes());
  }
});

module.exports = router;
