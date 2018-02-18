/* 分类模型 */
const db = require('./db');
const mongoose = db.mongoose;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    collection: 'b_category'
  });

// 静态方法示例
categorySchema.static('findCategories', function() {
  return this.find().exec();
})

Category = mongoose.model('Category', categorySchema, 'b_category');

exports.Category = Category;