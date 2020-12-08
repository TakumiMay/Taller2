module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/taller2/'
    : '/',
  "devServer": {
    "port": 3000
  },
  "transpileDependencies": [
    "vuetify"
  ]
}