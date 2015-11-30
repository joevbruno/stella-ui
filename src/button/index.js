import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Ripple from '../ripple';
import mixin from 'mixin-decorator';
import events from '../utils/events';

@mixin(PureRenderMixin)
export default class Button extends React.Component {
  static displayName = 'Button';
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    accent: React.PropTypes.bool,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    type: React.PropTypes.string,
    kind: React.PropTypes.string,
    children: React.PropTypes.any
  };
  static defaultProps = {
    className: '',
    ripple: true,
    type: 'flat',
    loading: false
  };
  handleMouseDown = (event) => {
    events.pauseEvent(event);
    this.refs.ripple.start(event);
  };
  render() {
    let className = this.props.kind ? `o-button--${this.props.type} --${this.props.kind}` : `o-button--${this.props.type}`;
    if (this.props.className) className = `${this.props.className}`;
    return (
      <button
        {...this.props}
        className = {className}
        disabled={this.props.disabled}
        onMouseDown={this.handleMouseDown} >
        { this.props.ripple ? <Ripple ref="ripple" /> : null }
        { this.props.label ? <abbr className="button__label">{this.props.label}</abbr> : null }
        {this.props.children}
      </button>
    );
  }
}
