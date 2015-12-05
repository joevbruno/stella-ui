import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Button from '../button';
import mixin from 'mixin-decorator';

@mixin(PureRenderMixin)
export default class Dialog extends React.Component {
  static displayName = 'Dialog';
  static propTypes = {
    actions: React.PropTypes.array,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.string,
  };
  static defaultProps = {
    actions: [],
    type: 'normal',
    active: false
  };
  renderActions = () => {
    return this.props.actions.map((action, idx) => {
        let className = 'o-button';
        if (action.className) className += ` ${action.className}`;
        return <Button key={idx} {...action} className={className} />;
    });
  };
  render() {
    let className = `o-dialog--${this.props.type}`;
    if (this.props.active) className += ' is-active';
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className}>
        <div role='overlay' className='o-dialog__overlay' />
        <div role='content' className='o-dialog__content'>
          <section role='body' className='o-dialog-content__body'>
            { this.props.title ? <h6 className='dialog-body__title'>{this.props.title}</h6> : null }
            { this.props.children }
          </section>
          <nav role='navigation' className='o-dialog-content__nav'>
            { this.renderActions() }
          </nav>
        </div>
      </div>
    );
  }
}
