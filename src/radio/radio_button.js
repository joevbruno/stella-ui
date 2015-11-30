import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Ripple from '../ripple';
import events from '../utils/events';
import mixin from 'mixin-decorator';

@mixin(PureRenderMixin)
export default class RadioButton extends React.Component {
  static displayName = 'RadioButton';
  static propTypes = {
    value: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
  };
  defaultProps = {
    value: false,
    className: '',
    disabled: false
  };

  handleClick (event) {
    events.pauseEvent(event);
    if (!this.props.disabled) this.handleChange(event);
  }

  handleChange (event) {
    if (!this.props.checked && this.props.onChange) {
      this.props.onChange(event, this);
    }
  }

  handleMouseDown (event) {
    if (!this.props.disabled) this.refs.ripple.start(event);
  }

  handleInputClick (event) {
    events.pauseEvent(event);
  }

  render () {
    let labelClassName = style[this.props.disabled ? 'disabled' : 'field'];
    let radioClassName = style[this.props.checked ? 'radio-checked' : 'radio'];
    if (this.props.className) labelClassName += ` ${this.props.className}`;

    return (
      <label className={labelClassName} onClick={this.handleClick}>
        <input
          {...this.props}
          ref='input'
          type='radio'
          className={style.input}
          onChange={this.handleChange}
          onClick={this.handleInputClick}
        />
        <span role='radio' className={radioClassName} onMouseDown={this.handleMouseDown}>
          <Ripple ref='ripple' role='ripple' className={style.ripple} spread={3} centered />
        </span>
        { this.props.label ? <span className={style.text}>{this.props.label}</span> : null }
      </label>
    );
  }
}
