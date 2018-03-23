/* 管理员模型 */
const db = require('./db');
const mongoose = db.mongoose;

const adminUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    _group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminGroup',
      required: true
    },
    createDate: {
      type: Number
    },
    lastLogin: {
      type: Number
    },
    isBan: {
      type: Boolean,
      required: true
    }
  },
  {
    collection: 'b_admin_user'
  });

AdminUser = mongoose.model('AdminUser', adminUserSchema, 'b_admin_user');

exports.AdminUser = AdminUser;
