const defer = require('config/defer').deferConfig;

module.exports = {
  clientUrl: "http://localhost",
  serverUrl: "http://localhost:1337",

  client: {
    clientUrl: defer(() => {
      return this.clientUrl;
    }),
    serverUrl: defer(() => {
      return this.serverUrl;
    })
  }
};
