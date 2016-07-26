var AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),
    log = require('./actions/log');

var Modules = function () {
  log('info', 'Start initializing Modules.');

  this.modules = {};

  this.all = function () {
    return this.modules;
  };

  this.get = function (name) {
    return this.all()[name];
  };

  this.add = function (name, module) {
    this.modules[name] = module;
    AppDispatcher.updatedModules(this.modules);
  };

  this.remove = function (name) {
    delete this.modules[name];
    AppDispatcher.updatedModules(this.modules);
  };

  this.getWidget = function (name) {
    return this.get(name).Widget;
  };

  this.getShortcut = function (name) {
    return this.get(name).Shortcut;
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedModules, callback);
  };

  var _this = this;
  AppDispatcher.bind(Events.installModule, function (name, module) {
    _this.add(name, module);
  });

  AppDispatcher.bind(Events.uninstallModule, function (name) {
    _this.remove(name);
  });

  log('info', 'Finish initializing Modules.');
};

module.exports = Modules;