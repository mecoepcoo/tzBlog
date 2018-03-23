/* 管理员模型 */
const db = require('./db');
const mongoose = db.mongoose;
const authConfig = require('../config/admin-auth-config');

const adminAuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    category: {
      type: String,
      required: true
    },
  },
  {
    collection: 'b_admin_auth'
  });

// 初始化用户权限
adminAuthSchema.static('initAdminAuth', function () {
  return this.find()
    .then(data => {
      if (!data.length) {
        this.create(authConfig);
      }
    });
})

AdminAuth = mongoose.model('AdminAuth', adminAuthSchema, 'b_admin_auth');

AdminAuth.initAdminAuth()
  .then(data => {
    console.log('权限数据初始化成功！');
  }, err => {
    console.log('权限数据初始化失败！');
  });

exports.AdminAuth = AdminAuth;
