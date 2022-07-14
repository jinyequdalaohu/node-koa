const path = require("path");
const {
  fileUploadError,
  fileTypeError,
  publishGoodsError,
  invalidGoodsId,
} = require("../constant/err.type");

const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods,
} = require("../service/goods.service");

class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files;
        const fileType = ["image/jpg", "image/jpeg", "image/png"];
        if (file) {
            if (!fileType.includes(file.mimetype)) {
                return ctx.app.emit("error", fileTypeError, ctx);
            }
            ctx.body = "图片上传成功";
            ctx.body = {
                code: 0,
                message: "图片上传成功",
                result: {
                    img: path.basename(file.filepath),
                },
            };
        } else {
            return ctx.app.emit("error", fileUploadError, ctx);
        }
    }
    async create(ctx, next) {
        // 直接调用service的createGoods 方法，进行数据库的操作
        try {
            const {createdAt, updatedAt, ...res} = await createGoods(ctx.request.body);
            ctx.body = {
                code: 0,
                message: '商品发布成功',
                result : res
            }
        } catch (err) {
            console.error(err);
            return ctx.app.emit("error", publishGoodsError, ctx);
        }
    }
    async update(ctx, next) {
        try{
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if(res){
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit("error", invalidGoodsId, ctx)
            }
        } catch (err) {
            console.error(err)
        }
    }
    async remove (ctx, next) {
        const res = await removeGoods(ctx.params.id)
        if(res) {
            ctx.body = {
                code: 0,
                message: '商品下架成功',
                result: ''
            }
        } else {
            return ctx.app.emit("error", invalidGoodsId, ctx);
        }
    }
    async restore (ctx, next) {
        const res = await restoreGoods(ctx.params.id)
        console.log(res,'res')
        if (res) {
          ctx.body = {
            code: 0,
            message: "商品上架成功",
            result: "",
          };
        } else {
          return ctx.app.emit("error", invalidGoodsId, ctx);
        }
    }
    async findAll (ctx, next) {
        // 1.解析pageNumber 和 pageSize
        const { pageNumber = 1, pageSize = 10 } = ctx.request.query
        // 2.调用数据处理逻辑
        const res = await findGoods(pageNumber, pageSize);
        // 3.返回结果
        ctx.body = {
            code: 0,
            message: '获取数据成功',
            result: res
        }
    }
}

module.exports = new GoodsController();
