/* 友情链接模型 */
const db = require('./db');
const mongoose = db.mongoose;

const statisticSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'b_statistic'
  });

statisticSchema.static('findStatistic', function () {
  return this.find();
})

Statistic = mongoose.model('Statistic', statisticSchema, 'b_statistic');

exports.Statistic = Statistic;