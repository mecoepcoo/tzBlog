const mongoose = require('mongoose');
const dbPath = require('../config/db-config');
mongoose.connect(dbPath, {useMongoClient: true});
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  console.log('连接成功!');
});

exports.mongoose = mongoose;