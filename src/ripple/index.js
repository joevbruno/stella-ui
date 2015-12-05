import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import mixin from 'mixin-decorator';

function getState() {
  return {
    active: false,
    restarting: false,
    top: null,
    left: null,
    width: null
  };
}

@mixin(PureRenderMixin)
export default class Ripple extends React.Component {
  static displayName = 'Ripple';
  static propTypes = {
    centered: React.PropTypes.bool,
    className: React.PropTypes.string,
    loading: React.PropTypes.bool,
    spread: React.PropTypes.number
  };

  static defaultProps = {
    centered: false,
    className: '',
    spread: 2
  };
  constructor(args) {
    super(args);
    this.state = getState();
  }
  getDescriptor = (pageX, pageY) => {
    const { left, top, height, width } = ReactDOM.findDOMNode(this).getBoundingClientRect();
    return {
      left: this.props.centered ? width / 2 : pageX - left,
      top: this.props.centered ? height / 2 : pageY - top,
      width: width * this.props.spread
    };
  };
  start = (data) => {
    console.log('called srater');
    const { pageX, pageY } = data;
    document.addEventListener('mouseup', this.end);
    let {top, left, width} = this.getDescriptor(pageX, pageY);
    this.setState({active: false, restarting: true, width: 0}, () => {
      this.refs.ripple.offsetWidth; // eslint-disable-line no-unused-expressions
      this.setState({active: true, restarting: false, top: 21, left: left, width: width});
    });
  };
  end = () => {
    document.removeEventListener('mouseup', this.end);
    this.setState({active: false});
  };
  render() {
    console.log('call render');
    const { left, top, width } = this.state;
    const rippleStyle = {left: left, top: top, width: width, height: width};
    let className = 'ripple__body';
    if (this.state.active) className += ' is-active';
    if (this.state.restarting) className += ' is-restarting';
    if (this.props.className) className = this.props.className;

    return (
      <span className="ripple">
        <span ref="ripple" role="ripple" className={className} style={rippleStyle} />
      </span>
    );
  }
}
