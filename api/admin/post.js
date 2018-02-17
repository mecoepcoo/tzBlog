/* 文章接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const PostModel = require('../../models/post');

/**
 * @apiDefine Post 文章
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */

router.route('/posts')
  /**
   * @api {get} /posts 获取文章列表（分页）
   * @apiName getPosts
   * @apiDescription 获取文章列表
   * @apiGroup Post
   * @apiVersion 1.0.0
   *
   * @apiParam {number} page=1 页码
   * @apiParam {number} pagesize=10 每页条数
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
    const result = {};

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
      })
  })
  
  /**
   * @api {post} /posts 新增文章
   * @apiName createPost
   * @apiDescription 新增文章
   * @apiGroup Post
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} title 标题
   * @apiParam {string} author 作者
   * @apiParam {string} categoryId 分类id
   * @apiParam {json} tagIds 标签id（json数组字符串）
   * @apiParam {number} order 排序
   * @apiParam {number} date 时间戳
   * @apiParam {string} content 正文
   * @apiUse STATUS
   * @apiSuccess {json} data 新增的文章
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 201,
   *         "message": "插入成功",
   *         "data": {
   *             "__v": 0,
   *             "title": "标题",
   *             "author": "作者",
   *             "_category": "5a7b0c259716f6209e98f3ed",
   *             "content": "正文",
   *             "_id": "5a88595dbaa0c9183fe67795",
   *             "reading": 0,
   *             "date": 312321,
   *             "order": 1,
   *             "_tags": [
   *                 "5a7b12ff9716f6209e98f3f1"
   *             ]
   *         }
   *     }
   */
  .post( (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const categoryId = req.body.categoryId || '';
    const tagIds = req.body.tagIds;
    const order = +req.body.order;
    const date = +req.body.date;
    const content = req.body.content || '';

    try {
      if (!title.length) {
        throw new Error('请输入标题');
      }
      if (!author.length) {
        throw new Error('请输入作者');
      }
      if (!categoryId) {
        throw new Error('缺少分类id');
      }
      if (!JSON.parse(tagIds)) {
        throw new Error('标签格式不正确');
      }
      if (!content.length) {
        throw new Error('请填写文章正文');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const postData = {
      title: title,
      author: author,
      _category: categoryId,
      _tags: JSON.parse(tagIds),
      content: content
    };

    if (order && !_.isNaN(order)) {
      _.assign(postData, { order: order });
    }

    if (date && !_.isNaN(date)) {
      _.assign(postData, { date: date });
    }

    const postSaved = {};
    const post = new PostModel.Post(postData);
    post.save()
      .then(data => {
        postSaved.data = data;
        return {
          tagId: JSON.parse(tagIds),
          postId: data._id
        };
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
      .then(data => {
        return re.r201(postSaved.data, lang.CREATE_OK, res);
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
  });

router.route('/posts/:id')
  /**
   * @api {get} /posts/:id 获取指定文章
   * @apiName getPost
   * @apiDescription 获取一篇文章
   * @apiGroup Post
   * @apiVersion 1.0.0
   *
   * @apiParam {string} id id
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
   * @apiSuccess {number} total -1
   * 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 200,
   *         "message": "操作成功",
   *         "data": 
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
   *             },
   *         "total": 7
   *     }
   */
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

    PostModel.Post.findOne({ '_id': id })
      .then(post => {
        if (post === null) {
          return re.r200({}, lang.OK, -1, res);
        }
        return re.r200(post, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  })
  /**
   * @api {put} /posts/:id 修改文章
   * @apiName updatePost
   * @apiDescription 修改文章
   * @apiGroup Post
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id 标题
   * @apiParam {string} title 标题
   * @apiParam {string} author 作者
   * @apiParam {string} categoryId 分类id
   * @apiParam {json} tagIds 标签id（json数组字符串）
   * @apiParam {number} order 排序
   * @apiParam {number} date 时间戳
   * @apiParam {string} content 正文
   * @apiUse STATUS
   * @apiSuccess {json} data 更新的文章
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 201,
   *         "message": "更新成功",
   *         "data": {
   *             "__v": 0,
   *             "title": "标题",
   *             "author": "作者",
   *             "_category": "5a7b0c259716f6209e98f3ed",
   *             "content": "正文",
   *             "_id": "5a88595dbaa0c9183fe67795",
   *             "reading": 0,
   *             "date": 312321,
   *             "order": 1,
   *             "_tags": [
   *                 "5a7b12ff9716f6209e98f3f1"
   *             ]
   *         }
   *     }
   */
  .put( (req, res) => {
    let id = req.params.id || req.body.id || '';
    id = id.replace(/\$/g, '');
    const title = req.body.title || '';
    const author = req.body.author || '';
    const categoryId = req.body.categoryId || '';
    const tagIds = req.body.tagIds;
    const order = +req.body.order;
    const date = +req.body.date;
    const content = req.body.content || '';

    try {
      if (!id.length) {
        throw new Error('缺少id参数');
      }
      if (!title.length) {
        throw new Error('请输入标题');
      }
      if (!author.length) {
        throw new Error('请输入作者');
      }
      if (!categoryId) {
        throw new Error('缺少分类id');
      }
      if (!JSON.parse(tagIds)) {
        throw new Error('标签格式不正确');
      }
      if (!content.length) {
        throw new Error('请填写文章正文');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const postData = {
      title: title,
      author: author,
      _category: categoryId,
      _tags: JSON.parse(tagIds),
      content: content
    }

    if (order && !_.isNaN(order)) {
      _.assign(postData, { order: order });
    }

    if (date && !_.isNaN(date)) {
      _.assign(postData, { date: date });
    }

    const postQuery = PostModel.Post.findOne().where({ '_id': id }).exec()
      .then(category => {
        if (category) {
          category.name = name;
          return category.save();
        } else {
          return re.r404({}, lang.NOT_FOUND, res);
        }
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
      .then(data => {
        return re.r201(data, lang.UPDATE_OK, res);
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
  })

  /**
   * @api {delete} /posts/:id 删除指定文章
   * @apiName deletePost
   * @apiDescription 删除指定文章
   * @apiGroup Post
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} id 文章id 
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 204,
   *         "message": "删除成功",
   *         "data": []
   *     }
   */
  .delete( (req, res) => {
    let id = req.params.id || req.body.id || '';
    id = id.replace(/\$/g, '');

    try {
      if (!id.length) {
        throw new Error('缺少id参数');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    PostModel.Post.findOne().where({ '_id': id }).remove()
      .then(data => {
        return re.r204([], lang.NO_CONTENT, res);
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
  })

module.exports = router;