import React from 'react';
import Ripple from '../ripple';
import events from '../utils/events';

export default class Hamburger extends React.Component {
  static propTypes = {
    isActive: React.PropTypes.bool.isRequired,
    handleClick: React.PropTypes.func // called on click.
  };
  static defaultProps = {
    isActive: false
  };
  handleMouseDown = (event) => {
    events.pauseEvent(event);
    this.refs.ripple.start(event);
  };
  render() {
    const className = this.props.isActive ? 'o-hamburger is-active' : 'o-hamburger';
    return (
      <div className={className} onClick={this.props.handleClick} onMouseDown={this.handleMouseDown}>
        <span className="o-hamburger__icon"></span>
        <Ripple ref="ripple" />
      </div>
    );
  }
}
