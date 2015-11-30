import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import mixin from 'mixin-decorator';

@mixin(PureRenderMixin)
export default class AccordionItem extends React.Component {
  static displayName = 'AccordionItem';
  static propTypes= {
    open: React.PropTypes.bool,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    identifier: React.PropTypes.string,
    title: React.PropTypes.string,
    children: React.PropTypes.children
  };
  static defaultProps = {
    open: false
  };
  render() {
    const className = this.props.open ? 'accordion__item is-open' : 'accordion_item';
    return (
      <div className={className}>
        <button>toggle</button>
        <div className="sectionhead" onClick={this.props.onClick.bind(this, this.props.identifier)}>{this.props.title}</div>
        <div className="articlewrap">
          <div className="article">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
