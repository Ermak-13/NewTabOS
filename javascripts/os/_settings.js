var _ = require('underscore'),
    defaultSettings = require('./settings');

var Settings = function (settings, onReadyCallback) {
  this.settings = _.extend(
    _.clone(defaultSettings),
    settings
  );

  this.get = function (key) {
    key = key.toUpperCase();
    return this.settings[key];
  };

  this.set = function (key, value) {
    this.settings[key] = value;
  };

  onReadyCallback();
};

module.exports = Settings;
