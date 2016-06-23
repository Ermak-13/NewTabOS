var React = require('react'),
    moment = require('moment'),

    OS = require('os'),
    globalSettings = OS.settings,
    AppDispatcher = OS.AppDispatcher,
    Events = OS.Events,
    Widget = OS.Widget,

    settings = require('./widget_settings');

var WIDGET_NAME = 'calendar';

var _Widget = React.createClass({
  name: settings.WIDGET_NAME,

  getInitialState: function () {
    return {
      _moment: moment(),
      updatedInterval: settings.DEFAULT_UPDATED_INTERVAL,

      widgetStyles: settings.DEFAULT_WIDGET_STYLES,
      calendarStyles: settings.DEFAULT_CALENDAR_STYLES,
      monthStyles: settings.DEFAULT_MONTH_STYLES,
      dayStyles: settings.DEFAULT_DAY_STYLES
    };
  },

  updateMoment: function () {
    this.setState({
      _moment: moment()
    });
  },

  openSettingsDialog: function () {
    AppDispatcher.openDefaultSettingsDialog(this.name, {
      widgetStyles: this.state.widgetStyles
    });
  },

  componentDidMount: function () {
    setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );

    var event = Events.saveSettings(globalSettings.DEFAULT_SETTINGS_DIALOG_NAME);
    AppDispatcher.bind(event, function (settings) {
      this.setState({
        widgetStyles: settings.widgetStyles
      });
    }.bind(this));
  },

  render: function () {
    return (
      <Widget
        name={ this.name }
        widgetHeaderDisabled={ true }
        widgetStyles={ this.state.widgetStyles }
        openSettingsDialog={ this.openSettingsDialog }>

        <div style={ this.state.calendarStyles }>
          <div style={ this.state.monthStyles }>
            { this.state._moment.format('MMMM') }
          </div>

          <div style={ this.state.dayStyles }>
            { this.state._moment.format('D') }
          </div>
        </div>

      </Widget>
    );
  }
});

module.exports = _Widget;
