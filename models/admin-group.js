/* 管理组模型 */
const db = require('./db');
const mongoose = db.mongoose;

const adminGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    _auth: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminAuth',
        required: true
      }
    ]
  },
  {
    collection: 'b_admin_group'
  });

// 获取列表
adminGroupSchema.static('getAdminGroups', function () {
  return this.find()
    .populate([
      {
        path: '_auth',
      },
    ]);
})

AdminGroup = mongoose.model('AdminGroup', adminGroupSchema, 'b_admin_group');

exports.AdminGroup = AdminGroup;
