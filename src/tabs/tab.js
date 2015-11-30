import React from 'react';

export default class Tab extends React.Component {
  static displayName = 'Tab';
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    label: React.PropTypes.string.isRequired,
    onActive: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
    children: React.PropTypes.any
  };
  static defaultProps = {
    className: ''
  };
  render() {
    let className = `o-tab ${this.props.className}`;
    if (this.props.active) className += ` is-active`;
    if (this.props.disabled) className += ` is-disabled`;
    if (this.props.hidden) className += ` is-hidden`;

    return (
      <section
        className={className}
        tabIndex={this.props.tabIndex}>
        { this.props.children }
      </section>
    );
  }
}
