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

Category = mongoose.model('Category', categorySchema, 'b_category');

exports.Category = Category;