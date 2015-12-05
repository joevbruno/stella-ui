import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import mixin from 'mixin-decorator';

@mixin(PureRenderMixin)
export default class AccordionItem extends React.Component {
  static displayName = 'AccordionItem';
  static propTypes= {
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    children: React.PropTypes.any
  };
  constructor(args) {
    super(args);
    this.state = {};
    this.state.open = false;
  }
  onClick = () => {
    this.setState({open: !this.state.open});
  }
  render() {
    const className = this.state.open ? 'accordion__item is-open' : 'accordion_item';
    return (
      <div className={className} onClick={this.onClick}>
        <div className="accordion-item__title">{this.props.title}</div>
        <div className="accordion-item__content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
