'use strict';
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Ripple from '../ripple';

export default React.createClass({
    mixins: [PureRenderMixin],
    displayName: 'Card',
    propTypes: {
        className: React.PropTypes.string,
        color: React.PropTypes.string,
        image: React.PropTypes.string,
        text: React.PropTypes.string,
        loading: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        title: React.PropTypes.string,
        type: React.PropTypes.string
    },
    getDefaultProps () {
        return {
            className: '',
            loading: false,
            type: 'default'
        };
    },

    getInitialState () {
        return {
            loading: this.props.loading
        };
    },

    loading (value) {
        this.setState({loading: value});
    },

    handleMouseDown (event) {
        if (this.props.onClick) {
            event.preventDefault();
            this.refs.ripple.start(event);
            this.props.onClick(event, this);
        }
    },
    renderTitle () {
        let styleFigure = {}, styleOverflow = {};
        if (this.props.image) styleFigure.backgroundImage = `url(${this.props.image})`;
        if (this.props.color) {
            styleFigure.backgroundColor = this.props.color;
            styleOverflow.backgroundColor = this.props.color;
        }

        if (this.props.title || this.props.image) {
            return (
                <figure className='o-figure' style={styleFigure}>
                  { this.props.subtitle ? <small className='o-figure__subtitle'>{this.props.subtitle}</small> : null }
                  { this.props.title ? <h5 className='o-figure__title'>{this.props.title}</h5> : null }
                  { this.props.color ? <div className='o-figure__overflow' style={styleOverflow}></div> : null }
                </figure>
            );
        }
    },


    render () {
        let className = this.props.className ? this.props.className : 'o-card';
        if (this.props.type) className += ` ${this.props.type}`;
        if (this.props.onClick) className += ' is-touched';
        if (this.props.image || this.props.color) className += ' is-contrast';
        if (this.props.color) className += ' has-color';
        if (this.state.loading) className += ' is-loading';

        return (
            <div className={className} onMouseDown={this.handleMouseDown} >
                { this.renderTitle() }
                { this.props.text ? <p className='o-card__text'>{this.props.text}</p> : null }

                <Ripple ref='ripple' className='ripple' loading={this.state.loading} spread={2.5}/>
          </div>
        );
      }
});
