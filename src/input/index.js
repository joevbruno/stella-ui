import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import mixin from 'mixin-decorator';

@mixin(PureRenderMixin)
export default class Input extends React.Component {
  static displayName = 'Input';
  static propTypes= {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.string,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    multiline: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    required: React.PropTypes.bool,
    type: React.PropTypes.string,
    value: React.PropTypes.any,
    validation: React.PropTypes.any
  };

  static defaultProps = {
    className: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    type: 'text'
  };

  renderInput = () => {
    let className = 'o-input__body';
    if (this.state.value && this.state.value.length > 0) className += ` is-active`;
    let input;
    if (this.props.multiline) {
      input = (
        <textarea
          role="input"
          {...this.props}
          className={className}
          onChange={this.props.onChange} />
      );
    } else {
      input = (
        <input
          role="input"
          {...this.props}
          className={className}
          onChange={this.props.onChange}
           />
      );
    }
    return input;
  };
  render() {
    let className = 'o-input';
    let labelClassName = 'o-input__label';
    let errorClass = 'o-input__error';
    if (this.props.value) className += ' has-content';
    if (!this.props.floating) labelClassName += `--floating`;
    if (this.props.className) className = `${this.props.className}`;
    if (this.props.disabled) className += ` is-disable`;
    if (this.props.type === 'hidden') className += ` is-hidden`;
    if (this.props.icon) className += `--with-icon`;
    if (this.props.error) {
      errorClass = 'o-input__error is-errored';
    } else {
      errorClass = 'o-input__error';
    }

    return (
      <div className={className}>
        { this.renderInput() }
        { this.props.icon ? this.props.icon : null }
        <span className="o-input__bar"></span>
        { this.props.label ? <label className={labelClassName}>{this.props.label}</label> : null }
        <span className={errorClass}>error</span>
      </div>
    );
  }
}
