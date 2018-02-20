/* 标签接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const TagModel = require('../../models/tag');
const PostModel = require('../../models/post');

// TODO: 文档
router.route('/tags')
  .get( (req, res) => {
    const countQuery = PostModel.Post
      .aggregate()
      .group({
        _id: '$_tags',
        count: {
          $sum: 1
        }
      })
      .lookup({
        from: 'b_tag',
        localField: '_id',
        foreignField: '_id',
        as: 'tags'
      })
      .project({
        _id: 0
      })
      .then(tags => {
        const data = [];
        _.forEach(tags, tag => {
          data.push({
            _id: _.get(tag, ['tags', '0', '_id']),
            tag: _.get(tag, ['tags', '0', 'name']),
            count: tag.count
          })
        })
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  });

module.exports = router;