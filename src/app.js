const { APP_PORT } = require("./config/config.default");

const app = require('./app/index')


// // 导入mysql
// const mysql = require('mysql')
// const connectMsg = require('../config/keys')
// //  建立与 MySQL 的连接
// const db = mysql.createPool(connectMsg);

// db.query('SELECT  1 ', (err, results) => {
//     if(err) return console.log(err.message)
//     console.log('连接成功',results[0], 'results')
// })


app.listen(APP_PORT, () => {
  console.log("server started on port " + APP_PORT + "!");
});