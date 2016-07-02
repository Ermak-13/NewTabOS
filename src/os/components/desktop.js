var React = require('react'),
    _ = require('underscore'),
    sprintf = require('sprintf-js').sprintf,

    globalSettings = require('../settings'),
    AppDispatcher = require('../app_dispatcher'),
    Events = require('../events'),
    storage = require('../storage'),

    log = require('../actions/log');

var Desktop = React.createClass({
  getInitialState: function () {
    return {
      widgets: [],
      nextWidgetId: 0
    };
  },

  saveDesktop: function () {
    var serializedWidgets = _.map(this.state.widgets, function (widget) {
      return {
        widgetName: widget.props.widgetName,
        widgetId: widget.props.widgetId
      };
    });

    storage.set(globalSettings.DESKTOP_STORAGE_KEY, serializedWidgets);
    log('info', 'Desktop is saved.');
  },

  loadDesktop: function (serializedWidgets) {
    var widgets = this.state.widgets,
        nextWidgetId = this.state.nextWidgetId;

    _.each(serializedWidgets, function (serializedWidget) {
      var widgetName = serializedWidget.widgetName,
          widgetId = serializedWidget.widgetId;

      widgets.push(
        this._createWidget(widgetName, widgetId)
      );
      nextWidgetId = widgetId + 1;
    }.bind(this));

    this.setState({
      widgets: widgets,
      nextWidgetId: nextWidgetId
    });
    log('info', 'Desktop is loaded.');
  },

  addWidget: function (widgetName) {
    var widgets = this.state.widgets,
        nextWidgetId = this.state.nextWidgetId;

    widgets.push(
      this._createWidget(widgetName, nextWidgetId)
    );

    this.setState({
      widgets: widgets,
      nextWidgetId: nextWidgetId + 1
    }, AppDispatcher.saveDesktop);
  },

  _createWidget: function (widgetName, nextWidgetId) {
    var WidgetClass = global.Widgets[widgetName];
    return React.createElement(
      WidgetClass,
      {
        key: nextWidgetId,
        widgetName: widgetName,
        widgetId: nextWidgetId
      }
    );
  },

  removeWidget: function (widgetId) {
    var widgets = _.filter(this.state.widgets, function (widget) {
      return widget.props.widgetId !== widgetId;
    });

    var storageKey = this.getWidgetStorageKey(widgetId);
    OS.storage.remove(storageKey);

    this.setState({
      widgets: widgets
    }, AppDispatcher.saveDesktop);
  },

  changedWidget: function (widgetId, settings) {
    var widget = _.find(this.state.widgets, function (widget) {
          return widget.props.widgetId === widgetId;
        });

    if (_.isUndefined(widget)) {
      log('error', sprintf('Change widget %s - is not found', widgetId));
      return;
    }

    var widgetName = widget.props.widgetName,
        storageKey = this.getWidgetStorageKey(widgetId);

    OS.storage.set(storageKey, {
      widgetName: widgetName,
      settings: settings
    });
  },

  getWidgetStorageKey: function (widgetId) {
    return sprintf(
      globalSettings.WIDGET_STORAGE_KEY,
      { id: widgetId }
    );
  },

  componentDidMount: function () {
    AppDispatcher.bind(Events.saveDesktop, function () {
      this.saveDesktop();
    }.bind(this));

    storage.get(globalSettings.DESKTOP_STORAGE_KEY, this.loadDesktop);

    AppDispatcher.bind(Events.addWidget, function (WidgetClass) {
      this.addWidget(WidgetClass);
    }.bind(this));

    AppDispatcher.bind(Events.removeWidget, function (widgetId) {
      this.removeWidget(widgetId);
    }.bind(this));

    AppDispatcher.bind(Events.changedWidget, function (widgetId, settings) {
      this.changedWidget(widgetId, settings);
    }.bind(this));
  },

  render: function () {
    return (
      <div id="desktop">
        <div id="widgets-container">
          { this.state.widgets }
        </div>
      </div>
    );
  }
});

module.exports = Desktop;
