/* 友情链接模型 */
const db = require('./db');
const mongoose = db.mongoose;

const blogrollSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'b_blogroll'
  });

Blogroll = mongoose.model('Blogroll', blogrollSchema, 'b_blogroll');

exports.Blogroll = Blogroll;