var _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    AppDispatcher = require('./app_dispatcher'),
    Events = require('./events'),

    log = require('./actions/log');

var addScript = function (options) {
  options = options || {};
  log('info', sprintf('add script %s', JSON.stringify(options)));

  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');

  if (options.text) {
    log('warning', sprintf('addScript - eval %s', options.text));
    eval(options.text);

    return ;
  }

  if (options.url) {
    script.setAttribute('src', options.url);
    document.body.appendChild(script);

    return ;
  }
};

var Scripts = function () {
  log('info', 'Start initializing Scripts.');

  this.list = [];

  this.all = function () {
    return this.list;
  };

  this.get = function (index) {
    return this.all()[index];
  };

  this.add = function (script) {
    this.list.push(script);

    var _this = this;
    global.Storage.set(global.Settings.get('scripts_storage_key'), _this.list, function () {
      addScript(script);
      AppDispatcher.updatedScripts(_this.list);
    });
  };

  this.remove = function (script) {
    this.list = _.without(this.list, script);

    var _this = this;
    global.Storage.set(global.Settings.get('scripts_storage_key'), _this.list, function () {
      AppDispatcher.updatedScripts(_this.list);
    });
  };

  this.updated = function (callback) {
    AppDispatcher.bind(Events.updatedScripts, callback);
  };

  this.load = function (onReadyCallback) {
    var _this = this;
    global.Storage.get(global.Settings.get('scripts_storage_key'), function (scripts) {
      _this.list = scripts || _this.list;

      _.each(_this.list, function (script) {
        addScript(script);
      });
      AppDispatcher.updatedScripts(_this.list);

      AppDispatcher.bind(Events.installScript, function (script) {
        _this.add(script);
      });

      AppDispatcher.bind(Events.uninstallScript, function (script) {
        _this.remove(script);
      });

      onReadyCallback();
    });
  };

  log('info', 'Finish initializing Scripts.');
};

module.exports = Scripts;
