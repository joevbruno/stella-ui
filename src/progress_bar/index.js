import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style';
import prefixer from '../utils/prefixer';

export default React.createClass({

    mixins: [PureRenderMixin],

    displayName: 'ProgressBar',

    propTypes: {
        buffer: React.PropTypes.number,
        className: React.PropTypes.string,
        max: React.PropTypes.number,
        min: React.PropTypes.number,
        mode: React.PropTypes.string,
        multicolor: React.PropTypes.bool,
        type: React.PropTypes.string,
        value: React.PropTypes.number
    },

    getDefaultProps () {
        return {
          buffer: 0,
          className: '',
          max: 100,
          min: 0,
          mode: 'indeterminate',
          multicolor: false,
          type: 'linear',
          value: 0
        };
    },

    calculateRatio (value) {
        if (value < this.props.min) return 0;
        if (value > this.props.max) return 1;
            return (value - this.props.min) / (this.props.max - this.props.min);
        },

    circularStyle () {
        if (this.props.mode !== 'indeterminate') {
            return {strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`};
        }
    },

    renderCircular () {
        return (
          <svg className={style.circle}>
            <circle className={style.path} style={this.circularStyle()} cx='30' cy='30' r='25' />
          </svg>
        );
    },

    linearStyle () {
        if (this.props.mode !== 'indeterminate') {
          return {
            buffer: prefixer({transform: `scaleX(${this.calculateRatio(this.props.buffer)})`}),
            value: prefixer({transform: `scaleX(${this.calculateRatio(this.props.value)})`})
          };
        } else {
          return {};
        }
    },

    renderLinear () {
        const {buffer, value} = this.linearStyle();
        return (
          <div>
            <span ref='buffer' data-ref='buffer' className='o-progress__buffer' style={buffer}></span>
            <span ref='value' data-ref='value' className='o-progress__value' style={value}></span>
          </div>
        );
    },

    render () {
        let className = this.props.type === 'linear' ? 'o-progress--linear' : 'o-progress--circular';
        if (this.props.mode) className +=  `is-${this.props.mode}`;
        if (this.props.multicolor) className += ' is-multicolor';
        if (this.props.className) className = `${this.props.className}`;

        return (
          <div
            className={className}
            aria-valuenow={this.props.value}
            aria-valuemin={this.props.min}
            aria-valuemax={this.props.max}
          >
            { this.props.type === 'circular' ? this.renderCircular() : this.renderLinear() }
          </div>
        );
    }
});
