var _ = require('underscore'),
    OS = require('os');

var Widgets = {
  Panel: require('./panel'),

  Logger: require('./logger'),
  Installer: require('./installer'),
  AboutJSOS: require('./about')
};

module.exports = Widgets;
