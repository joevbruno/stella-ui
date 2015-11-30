import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import mixin from 'mixin-decorator';

@mixin(PureRenderMixin)
export default class Tabs extends React.Component {
  static displayName = 'Tabs';
  static propTypes = {
    className: React.PropTypes.string,
    index: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func,
    handleTabClick: React.PropTypes.func,
    children: React.PropTypes.any
  };
  static defaultProps = {
    className: '',
    index: 0
  };
  constructor(args) {
    super(args);
  }
  renderLabels(labels) {
    return labels.map((props) => {
      return <label {...props}>{ props.label }</label>;
    });
  }
  render() {
    const labels = [];
    const tabs = this.props.children.map((tab, index) => {
      const active = this.props.index === index;
      let className = `o-tab-label ${tab.props.className}`;

      if (active) className += ` is-active`;
      if (tab.props.disabled) className += ` is-disabled`;
      if (tab.props.hidden) className += ` is-hidden`;

      labels.push({
        className: className,
        label: tab.props.label,
        key: index,
        onClick: !tab.props.disabled ? this.handleTabClick.bind(null, index) : null
      });

      return React.cloneElement(tab, {active: active, key: index, tabIndex: index });
    });

    let className = 'o-tabs';
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className}>
        <nav className="o-tabs__navigation">
          { this.renderLabels(labels) }
        </nav>
        <span className="o-tabs__pointer" />
        { tabs }
      </div>
    );
  }
}
