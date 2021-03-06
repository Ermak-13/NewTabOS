var React = require('react'),

    OS = require('os'),
    Mixins = OS.Mixins,
    Configurator = OS.Configurator,
    HForm = OS.HForm,
    Input = OS.Input,
    Textarea = OS.Textarea;

var _Configurator = React.createClass({
  mixins: [Mixins.ConfiguratorHelper],

  handleSubmit: function (e) {
    e.preventDefault();

    var settings = this.props.settings,

        desktopStyles = _.extend(
          _.clone(settings.desktopStyles),
          { background: this.refs.background.getValue() }
        ),

        configureBtnStyles = _.extend(
          _.clone(settings.configureBtnStyles),
          {}
        );

    settings = _.extend(
      _.clone(this.props.settings),
      {
        desktopStyles: desktopStyles,
        configureBtnStyles: configureBtnStyles
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      <Configurator.DefaultDialog
        ref={ this.getRefName() }
        name={ this.props.name }
        onClose={ this.props.onClose }>

        <HForm.Form onSubmit={ this.handleSubmit }>
          <HForm.Field
            labelText={ global.I18n.t('desktop.background.label') }>
            <Textarea
              ref="background"
              value={ settings.desktopStyles.background }
            />
          </HForm.Field>

          <HForm.Submit value={ global.I18n.t('configurator.submit.value') } />
        </HForm.Form>

      </Configurator.DefaultDialog>
    );
  }
});

module.exports = _Configurator;
