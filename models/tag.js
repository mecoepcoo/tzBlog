/* 标签模型 */
const db = require('./db');
const mongoose = db.mongoose;

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    collection: 'b_tag'
  });

Tag = mongoose.model('Tag', tagSchema, 'b_tag');

exports.Tag = Tag;