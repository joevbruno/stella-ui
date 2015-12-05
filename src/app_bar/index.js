import React from 'react';

export default class AppBar extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    fixed: React.PropTypes.bool,
    flat: React.PropTypes.bool,
    children: React.PropTypes.any
  };
  static defaultProps = {
    className: '',
    fixed: false,
    flat: false
  };
  render() {
    let className = 'o-appbar';
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.fixed) className += ' is-fixed';
    if (this.props.flat) className += ' is-flat';

    return (
      <header className={className}>
        {this.props.children}
      </header>
    );
  }
}
