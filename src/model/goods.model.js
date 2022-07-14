const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 创建模型 ()
const Goods = seq.define('goods', {
    //  id会被sequelize自动创建管理
    goods_name:{
        type: DataTypes.STRING,
        allowNull: false, //是否为空
        unique: true,
        comment: '商品名称'
    },
    goods_price:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '商品库存'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片'
    },
},
    {
        paranoid: true
    }
)

// 创建表，创建完之后注释掉
// Goods.sync({ force: true })

module.exports = Goods