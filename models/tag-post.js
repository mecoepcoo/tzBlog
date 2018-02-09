/* 标签-文章关联模型 */
const db = require('./db');
const Tag = require('./tag').Tag;
const Post = require('./post').Post;
const mongoose = db.mongoose;

const tagPostSchema = new mongoose.Schema(
  {
    tagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    }
  },
  {
    collection: 'b_tag_post'
  });

TagPost = mongoose.model('TagPost', tagPostSchema, 'b_tag_post');

exports.Tag = Tag;