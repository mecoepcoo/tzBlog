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
      default: 0
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    collection: 'b_post'
  });

/**
 * 根据分类id筛选文章
 */
postSchema.static('findByCategory', function (categoryId, page = 1, pageSize = 10) {
  const postQuery = this.find()
    .where({ _category: categoryId })
    .sort({ order: -1, date: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate([
      {
        path: '_category',
      },
      {
        path: '_tags',
      }
    ])

  const postCountQuery = this.find()
    .where({ _category: categoryId })
    .count()

  return Promise.all([postQuery, postCountQuery]);
})

/**
 * 根据分类id筛选文章
 */
postSchema.static('findByTag', function (tagId, page = 1, pageSize = 10) {
  const postQuery = this.find()
    .where({ _tags: tagId })
    .sort({ order: -1, date: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .populate([
      {
        path: '_category',
      },
      {
        path: '_tags',
      }
    ])

  const postCountQuery = this.find()
    .where({ _tags: tagId })
    .count()

  return Promise.all([postQuery, postCountQuery]);
})

Post = mongoose.model('Post', postSchema, 'b_post');

exports.Post = Post;