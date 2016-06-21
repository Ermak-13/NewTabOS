require('./globals');

var OS = {
  AppDispatcher: require('./os/app_dispatcher'),
  Events: require('./os/events'),
  settings: require('./os/settings'),

  Widget: require('./os/components/widget'),
  SettingsDialog: require('./os/components/settings_dialog'),
  WidgetStylesForm: require('./os/components/widget_styles_form'),
  HForm: require('./os/components/hform'),
  Input: require('./os/components/input'),
  Submit: require('./os/components/submit'),

  Mixins: require('./os/mixins')
};

global.OS = OS;
