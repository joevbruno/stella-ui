import React from 'react';
import classNames from 'classnames';

export default class Options extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,             // className (based on mouse position)
    isDisabled: React.PropTypes.bool,              // the option is disabled
    isFocused: React.PropTypes.bool,               // the option is focused
    isSelected: React.PropTypes.bool,              // the option is selected
    onSelect: React.PropTypes.func,                // method to handle click on option element
    onFocus: React.PropTypes.func,                 // method to handle mouseEnter on option element
    onUnfocus: React.PropTypes.func,               // method to handle mouseLeave on option element
    option: React.PropTypes.object.isRequired,     // object that is base for that option
    focused: React.PropTypes.bool,
    children: React.PropTypes.any
  };
  blockEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if ((event.target.tagName !== 'A') || !('href' in event.target)) {
      return;
    }
    if (event.target.target) {
      window.open(event.target.href, event.target.target);
    } else {
      window.location.href = event.target.href;
    }
  };
  handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  };
  handleMouseEnter = (event) => {
    this.props.onFocus(this.props.option, event);
  };
  handleMouseMove = (event) => {
    if (this.props.focused) return;
    this.props.onFocus(this.props.option, event);
  };
  render() {
    const { option } = this.props;
    const className = classNames(this.props.className, option.className);

    return option.disabled ? (
			<div className={className}
				onMouseDown={this.blockEvent}
				onClick={this.blockEvent}>
				{this.props.children}
			</div>
		) : (
			<div className={className}
				style={option.style}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={option.title}>
				{this.props.children}
			</div>
		);
  }
}
