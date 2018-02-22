var svgCaptcha = require('svg-captcha');

function getCaptcha() {
  var captcha = svgCaptcha.createMathExpr({
    noise: 2,
    color: true,
    width: 116,
    height: 32,
    fontSize: 36,
    background: '#f8f8f8'
  });
  return captcha;
}

module.exports.getCaptcha = getCaptcha;