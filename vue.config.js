module.exports = {
  publicPath: 'mindmap',
  css: {
    extract: false,
  },
  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: config => {
    config.module.rule('images').test(/.(jpg|jpeg|png|gif|ico)$/) // 给这些图片类型做压缩
      .use('url-loader') // url-loader要搭配file-loader做图片压缩
      .loader('url-loader')
      .options({
        limit: 1024 * 12, // 小于12kb的图片压缩成base64，图片太大转成base64反而不太合适
        name: 'static/img/[name].[ext]',
        // 指定打包后的图片存放的位置，一般放在static下img文件夹里 name.ext分别为：文件名.文件后缀（按照原图片名）
      })
      .end() // 返回上一级 以便于继续添加loader
      .enforce('post') // 表示先执行配置在下面那个loader，即image-webpack-loader
  },
}
