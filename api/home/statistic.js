/* 前台数据统计接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const StatisticModel = require('../../models/statistic');

router.route('/statistics')
  .get( (req, res) => {
    const ip = req.ip;
    const statistic = {};
    const statisticQuery = StatisticModel.Statistic.findOne({ip: ip})
      .then((doc) => {
        if (doc) {
          doc.count++;
          return doc.save();
        } else {
          const newStatistic = new StatisticModel.Statistic({
            ip: ip,
            count: 0
          });
          return newStatistic.save();
        }
      })
      .then(() => {
        return StatisticModel.Statistic
          .aggregate()
          .group({
            _id: '',
            count: {
              $sum: '$count'
            }
          })
      })
      .then(pv => {
        statistic.pv = pv[0].count;
        return StatisticModel.Statistic.find().count();
      })
      .then((uv) => {
        statistic.uv = uv;
        return re.r200(statistic, 'ok', -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  })

module.exports = router;