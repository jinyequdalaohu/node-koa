const { DataTypes } = require('sequelize');

const seq = require('../db/seq')

// 创建模型 ()
const User = seq.define('user', {
    //  id会被sequelize自动创建管理
    user_name:{
        type: DataTypes.STRING,
        allowNull: false, //是否为空
        unique: true,
        comment: '用户名，唯一'
    },
    password:{
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        comment: '是否是管理员，0：不是管理员，1：管理员，默认为 0'
    }
},
{
    // timestamps:false,   //将时间戳字段去除。可以保留
})

// 创建数据表
// User.sync({force: true})

module.exports = User