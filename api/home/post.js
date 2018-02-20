/* 文章接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const PostModel = require('../../models/post');

router.route('/posts')
  .get( (req, res) => {
    const page = +req.query.page || 1;
    const pageSize = +req.query.pagesize || 10;
    const categoryId = req.query.categoryid || '';
    const tagId = req.query.tagid || '';
    console.log(categoryId);
    const result = {};

    if (categoryId) {
      PostModel.Post.findByCategory(categoryId, page, pageSize)
        .then(data => {
          return re.r200(data[0], lang.OK, data[1], res);
        }, err => {
          return re.r404(err, lang.NOT_FOUND, res);
        });
    } else if (tagId) {
      PostModel.Post.findByTag(tagId, page, pageSize)
        .then(data => {
          return re.r200(data[0], lang.OK, data[1], res);
        }, err => {
          return re.r404(err, lang.NOT_FOUND, res);
        });
    } else {
      // 取文章列表
      const postQuery = PostModel.Post.find()
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
        .then(posts => {
          result.posts = posts;
        }, err => {
          return re.r404(err, lang.NOT_FOUND, res);
        });
      // 取文章总数
      const postCountQuery = PostModel.Post.count()
        .then(count => {
          result.total = count;
        }, err => {
          return re.r404(err, lang.NOT_FOUND, res);
        });

      Promise.all([postQuery, postCountQuery])
        .then(() => {
          return re.r200(result.posts, lang.OK, result.total, res);
        });
    }
  });

router.route('/posts/:id')
  .get((req, res) => {
    let id = req.params.id || req.body.id || '';
    id = id.replace(/\$/g, '');

    // 参数校验
    try {
      if (!id.length) {
        throw new Error('缺少id参数');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const data = {};
    const postQuery = PostModel.Post.findOne({ '_id': id })
      .then(post => {
        if (post === null) {
          return re.r200({}, lang.OK, -1, res);
        }
        data.post = post;
        return PostModel.Post
          .find({
            '_id': {
              $gt: data.post._id
            }
          })
          .sort({ '_id': 1 })
          .limit(1)
      })
      // 取上一篇文章
      .then(prev => {
        if (prev.length) {
          data.prevPost = {
            _id: prev[0]._id,
            title: prev[0].title
          };
        } else {
          data.prevPost = {};
        }
        return PostModel.Post
          .find({
            '_id': {
              $lt: data.post._id
            }
          })
          .sort({ '_id': -1 })
          .limit(1)
      })
      // 取下一篇文章
      .then(nxt => {
        if (nxt.length) {
          data.nextPost = {
            _id: nxt[0]._id,
            title: nxt[0].title
          };
        } else {
          data.nextPost = {};
        }
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  })
  
module.exports = router;