var React = require('react'),

    OS = require('os'),
    Link = OS.Link;

var HistoryShortcut = React.createClass({
  handleClick: function () {
    chrome.tabs.create({
      url: 'chrome://history'
    });
  },

  render: function () {
    return (
      <Link
        className={ this.props.className }
        onClick={ this.handleClick }>

        <span className="fa fa-history" />
      </Link>
    );
  }
});

module.exports = HistoryShortcut;
