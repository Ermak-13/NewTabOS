var modules = {
  React: require('react'),
  ReactDOM: require('react-dom'),
  _: require('underscore'),
  s: require('underscore.string'),
  sprintf: require('sprintf-js').sprintf,
  moment: require('moment-timezone'),

  OS: require('os')
};

for (var key in modules) {
  global[key] = modules[key];
}
