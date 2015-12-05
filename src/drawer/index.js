import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    displayName: 'Drawer',

    propTypes: {
        className: React.PropTypes.string,
        hideable: React.PropTypes.bool,
        type: React.PropTypes.string,
        handleOverlayClick: React.PropTypes.func
    },

    getDefaultProps () {
        return {
            className: '',
            type: 'left'
        };
    },
    render () {

        let className = `o-drawer--${this.props.type}`;
        if (this.props.active ) className += ` is-active`;
        if (this.props.className) className = `${this.props.className}`;

        return (
          <div className={className}>
            <div className='o-drawer__overlay' onClick={this.props.handleOverlayClick}></div>
            <aside className='o-drawer__content'>
              { this.props.children }
            </aside>
          </div>
        );
    }
});
