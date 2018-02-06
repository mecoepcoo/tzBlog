/* 文章模型 */
const db = require('./db');
const Category = require('./category').Category;
const Tag = require('./tag').Tag;
const mongoose = db.mongoose;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    _category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    _tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
      }
    ],
    order: {
      type: Number,
      default: 1
    },
    date: {
      type: Number,
      default: new Date().getTime()
    },
    reading: {
      type: Number,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    collection: 'b_post'
  });

Post = mongoose.model('Post', postSchema, 'b_post');

exports.Post = Post;