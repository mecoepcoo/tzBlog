/* 文章接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const PostModel = require('../../models/post');

/**
 * @apiDefine PostHome 文章（客户端）
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */

router.route('/posts')
  /**
   * @api {get} /posts 获取文章列表（分页）
   * @apiName getPostsHome
   * @apiDescription 获取文章列表
   * @apiGroup PostHome
   * @apiVersion 1.0.0
   *
   * @apiParam {number} page=1 页码
   * @apiParam {number} pagesize=10 每页条数
   * @apiParam {string} [categoryid] 分类id，根据分类筛选，不能与标签筛选同时使用
   * @apiParam {string} [tagid] 标签id，根据标签筛选，不能与分类筛选同时使用
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.title 文章标题
   * @apiSuccess {string} data.author 作者
   * @apiSuccess {object} data._category 分类
   * @apiSuccess {string} data._category.name 分类名称
   * @apiSuccess {string} data.content 正文
   * @apiSuccess {number} data.reading 阅读量
   * @apiSuccess {number} data.date 时间戳
   * @apiSuccess {number} data.order 排序，数字越大越靠前
   * @apiSuccess {array} data._tags 分类
   * @apiSuccess {string} data._tags.name 分类名称
   * @apiSuccess {number} total 总条数
   * 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 200,
   *         "message": "操作成功",
   *         "data": [
   *             {
   *                 "_id": "5a7b18c9b6d4de46cf028efd",
   *                 "title": "t2",
   *                 "author": "t",
   *                 "_category": 5a7b18c9b6d4de46cf028efe,
   *                 "content": "313",
   *                 "__v": 0,
   *                 "reading": 0,
   *                 "date": 1518016633349,
   *                 "order": 3,
   *                 "_tags": [
   *                     {
   *                         "_id": "5a7b12ff9716f6209e98f3f1",
   *                         "name": "t5",
   *                         "__v": 0
   *                     }
   *                 ]
   *             }
   *         ],
   *         "total": 7
   *     }
   */
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
      .populate([
        {
          path: '_category',
        },
        {
          path: '_tags',
        }
      ])
      .then(post => {
        if (post === null) {
          return re.r200({}, lang.OK, -1, res);
        }
        data.post = post;
        const newPost = _.cloneDeep(post);
        newPost.reading++;
        
        newPost.save();
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
