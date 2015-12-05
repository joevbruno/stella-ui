import React from 'react';

export default class TabContent extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    tabIndex: React.PropTypes.number
  };

  static defaultProps = {
    active: false,
    className: ''
  };

  render() {
    let className = 'o-tab-content';
    if (this.props.active) className += ' isActive';
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <section className={className} tabIndex={this.props.tabIndex}>
        {this.props.children}
      </section>
    );
  }
}
