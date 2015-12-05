import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Ripple from '../ripple';
import events from '../utils/events';
import mixin from 'mixin-decorator';

@mixin(PureRenderMixin)
export default class Switch extends React.Component {
  static displayName = 'Switch';
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func
  };
  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  handleInputClick(event) {
    events.pauseEvent(event);
  }
  handleMouseDown = (event) => {
    if (!this.props.disabled) this.refs.ripple.start(event);
  }
  render() {
    let labelClassName = this.props.disabled ? 'o-checkbox isDisabled' : 'o-checkbox';
    let switchClassName = this.props.checked ? 'o-checkbox__box isChecked' : 'o-checkbox__box';
    if (this.props.className) labelClassName += ` ${this.props.className}`;

    return (
      <label
        className={labelClassName}
        onClick={this.handleClick}
      >
        <input
          {...this.props}
          type='checkbox'
          checked={this.props.checked}
          className='o-checkbox__input'
          onClick={this.handleInputClick}
        />
        <span role='switch' className={switchClassName}>
          <span role='thumb' className='o-checkbox-box__thumb' onMouseDown={this.handleMouseDown}>
            <Ripple ref='ripple' role='ripple' className='o-checkbox-ripple' spread={2.4} centered />
          </span>
        </span>
        { this.props.label ? <span className='o-checkbox__label'>{this.props.label}</span> : null }
      </label>
    );
  }
};
