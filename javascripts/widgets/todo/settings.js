var _ = require('underscore'),

    OS = require('os'),
    globalSettings = OS.settings;

var settings = {
  WIDGET_NAME: 'todo',
  CONFIGURATOR_REF_NAME: 'configurator',

  DEFAULT_SIZE: {
    width: '450px',
    height: '300px'
  },
  DEFAULT_POSITION: globalSettings.DEFAULT_POSITION
};

module.exports = settings;