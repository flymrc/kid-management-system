const timestamp = new Date().getTime();
module.exports = {
  devServer: {
      port: 88,     // 端口
      disableHostCheck: true
  },
  lintOnSave: false  // 取消 eslint 验证
};
