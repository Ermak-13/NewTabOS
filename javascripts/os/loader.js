var Settings = require('./_settings'),
    Logger = require('./logger'),
    Modules = require('./modules'),
    Scripts = require('./scripts'),
    Widgets = require('./widgets');

var Loader = function () {
  this.load = function (callback) {
    global.Settings = new Settings({}, function () {
      global.Logger = new Logger(function () {
        global.Modules = new Modules(function () {
          global.Scripts = new Scripts(function () {
            global.Widgets = new Widgets(function () {
              callback();
            });
          });
        });
      });
    });
  };
};

module.exports = Loader;
