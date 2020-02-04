const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/chat.postMessage',
    proxy({
      target: 'https://slack.com/api/',
      changeOrigin: true,
    })
  );
  app.use(
    '/files.upload',
    proxy({
      target: 'https://slack.com/api/',
      changeOrigin: true,
    })
  );
  app.use(
    '/conversations.history',
    proxy({
      target: 'https://slack.com/api/',
      changeOrigin: true,
    })
  );
};