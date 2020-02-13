const defer = require('config/defer').deferConfig;

module.exports = {
  certPath: '',
  clientUrl: "http://localhost",
  serverUrl: "http://localhost:1337",

  client: {
    clientUrl: defer(function () {
      return this.clientUrl;
    }),
    serverUrl: defer(function () {
      return this.serverUrl;
    })
  }
};
