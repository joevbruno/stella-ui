import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Ripple from '../ripple';
import Input from '../input';
import events from '../utils/events';
import mixin from 'mixin-decorator';

@mixin(PureRenderMixin)
export default class Checkbox extends React.Component {
  static displayName = 'Checkbox';
  static propTypes = {
    value: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.any,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  };
  static defaultProps = {
    value: false,
    className: '',
    disabled: false
  };
  handleChange = (event) => {
    events.pauseEvent(event);
    if (!this.props.disabled) {
      this.props.onChange(!this.props.value);
    }
  };
  handleMouseDown = (event) => {
    events.pauseEvent(event);
    if (!this.props.disabled) {
      this.refs.ripple.start(event);
    }
  };
  render() {
    let fieldClassName = 'o-checkbox';
    let checkboxClassName = 'o-checkbox__box';
    if (this.props.disabled) fieldClassName += ' is-disabled';
    if (this.props.className) fieldClassName = `${this.props.className}`;
    if (this.state.checked) checkboxClassName += ' is-checked';

    return (
      <label className="o-checkbox">
        <Input
          {...this.props}
          type="checkbox"
          value={this.props.value}
          className="o-checkbox__input"
          onClick={this.handleChange} />
        <span role="checkbox" className={checkboxClassName} onMouseDown={this.handleMouseDown}>
          <Ripple ref="ripple" role="ripple" className="ripple" spread={3} centered />
        </span>
        { this.props.label ? <span role="label" className="o-checkbox__text">{this.props.label}</span> : null }
      </label>
    );
  }
}
