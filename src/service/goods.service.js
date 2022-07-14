const Goods = require('../model/goods.model')

class GoodsService {
    async createGoods(goods) {
       const res = await Goods.create(goods)
       return res.dataValues
    }

    async updateGoods(id, goods) {
        console.log(id, goods)
        const res = await Goods.update(goods, {where: {id}})
        console.log(res[0],'res')
        return res[0] > 0 ? true : false
    }
    async removeGoods(id) {
        const res = await Goods.destroy({where: {id}})
        return res > 0 ? true : false;
    }
    async restoreGoods(id) {
        const res = await Goods.restore({ where: { id } });
        return res > 0 ? true : false;
    }
    async findGoods(pageNumber, pageSize) {
      // // 1.获取总数
      // const count = await Goods.count();
      // // 2.获取具体数据
      // const offset = (pageNumber - 1) * pageSize
      // const res = await Goods.findAll({ offset: offset, limit: pageSize * 1 });
      // return {
      //     pageNumber: pageNumber,
      //     pageSize: pageSize,
      //     total: count,
      //     list: res
      // }
      const offset = (pageNumber - 1) * pageSize;
      const { count, rows } = await Goods.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
      });
      return {
        pageNumber: pageNumber,
        pageSize: pageSize,
        total: count,
        list: rows,
      };
    }
}

module.exports = new GoodsService();