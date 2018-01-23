/* 加密、散列函数 */
const crypto = require('crypto');

/**
 * 加密算法（md5 → 加盐 → md5）
 * 依赖: crypto
 * @param {string} string 源字符串
 * @param {string} salt 盐
 * @returns {string}
 */
function buildPwd(string, salt) {
  let str = md5Hash(string);
  str = salt + str;
  str = md5Hash(str);
  return str;
}

/**
 * md5 hash散列
 * @param string 源字符串
 * @return string 32位小写16进制表示的md5散列的字符串
 */
function md5Hash(string) {
  const md5 = crypto.createHash('md5');
  md5.update(string);
  return md5.digest('hex');
}

/**
 * 生成盐
 * @param {string}length 盐的长度,推荐使用32位
 * @returns {string}
 */
function setSalt(length) {
  let salt = '';
  const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const len = length > 256 ? 256 : length;
  for (let i = 0; i < len; i++) {
    salt += chars[Math.floor(Math.random() * chars.length)];
  }
  return salt;
}

module.exports = {
  buildPwd: buildPwd,
  md5Hash: md5Hash,
  setSalt: setSalt
};