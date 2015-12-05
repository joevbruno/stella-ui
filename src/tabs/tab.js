import React from 'react';
import ClassNames from 'classnames';
import Ripple from '../ripple';
import events from '../utils/events';

export default class TabHeader extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    label: React.PropTypes.any.isRequired,
    onActive: React.PropTypes.func,
    onClick: React.PropTypes.func
  };
  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    hidden: false
  };
  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };
  handleMouseDown = (event) => {
    events.pauseEvent(event);
    this.refs.ripple.start(event);
  };
  render() {
    const className = ClassNames('o-tab-label', {
      ' isActive': this.props.active,
      ' isHidden': this.props.hidden,
      ' isDisabled': this.props.disabled
    }, this.props.className);

    return (
      <label className={className} onClick={this.handleClick} onMouseDown={this.handleMouseDown}>
        {this.props.label}
        <Ripple ref='ripple' spread={1} />
      </label>
    );
  }
}

