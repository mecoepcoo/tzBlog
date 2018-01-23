/* 响应函数 */
module.exports = {
  /**
   * 获取数据成功 200 OK
   * @param data 获取的数据
   * @param message 文本信息
   * @param num 总数
   * @param res
   * @returns {*|JSON|Promise<any>}
   */
  r200: function (data, message, num, res) {
    return res.status(200).json({
      status: 200,
      message: message,
      data: data,
      total: num
    })
  },

  /**
   * 插入、更新成功 201
   * @param data 更新的数据
   * @param message 文本信息
   * @param res
   * @returns {*|JSON|Promise<any>}
   */
  r201: function (data, message, res) {
    return res.status(200).json({
      status: 201,
      message: message,
      data: data
    })
  },

  /**
   * 请求有误，更新操作错误
   * @param err 错误
   * @param message 文本信息
   * @param res
   * @returns {*|JSON|Promise<any>}
   */
  r104: function (err, message, res) {
    return res.status(200).json({
      status: 104,
      message: message,
      error: err
    })
  },

  /**
   * 资源不存在
   * @param err
   * @param message
   * @param res
   * @returns {*|JSON|Promise<any>}
   */
  r404: function (err, message, res) {
    return res.status(200).json({
      status: 404,
      message: message,
      error: err
    })
  }
};