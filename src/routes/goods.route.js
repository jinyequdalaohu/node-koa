const Router = require('koa-router');

const { auth, hasAdmin} = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.minddleware");

const {
  upload,
  create,
  update,
  remove,
  restore,
  findAll,
} = require("../controller/goods.controller");

const router = new Router({prefix: '/goods'})

// 图片上传接口
router.post('/upload', auth, hasAdmin, upload)

// 发布商品接口
router.post("/", auth, hasAdmin, validator, create);

// 修改商品接口
router.put("/:id", auth, hasAdmin, validator, update);

// 删除商品（硬删除）
// router.delete("/:id", auth, hasAdmin, remove);

// 软删除
router.post("/:id/off", auth, hasAdmin, hasAdmin, remove);

// 上架商品
router.post("/:id/on", auth, hasAdmin, hasAdmin, restore);

// 商品列表
router.get('/', findAll)

module.exports = router