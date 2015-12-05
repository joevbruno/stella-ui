import React from 'react';
import TabContent from './TabContent';
import Tab from './Tab';  //Tab Header = LABEL

export default class Tabs extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    index: React.PropTypes.number,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    index: 0
  };

  state = {
    pointer: {}
  };

  componentDidMount () {
    setTimeout(() => {
      this.updatePointer(this.props.index);
    }, 100);
  }

  componentWillReceiveProps (nextProps) {
    this.updatePointer(nextProps.index);
  }

  handleHeaderClick = (idx) => {
    console.log('index', idx);
    console.log(this.props.onChange);
    if (this.props.onChange) this.props.onChange(idx);
  };

  parseChildren () {
    const headers = [];
    const contents = [];

    React.Children.forEach(this.props.children, (item) => {
      if (item.type.name === 'TabHeader') {
        headers.push(item);
        if (item.props.children) {
          contents.push(<TabContent children={item.props.children}/>);
        }
      } else if (item.type.name === 'TabContent') {
        contents.push(item);
      }
    });

    return {headers, contents};
  }

  updatePointer (idx) {
    console.log(this.refs.navigation.children);
    const startPoint = this.refs.tabs.getBoundingClientRect().left;
    const label = this.refs.navigation.children[idx].getBoundingClientRect();
    this.setState({
      pointer: {
        top: `${this.refs.navigation.getBoundingClientRect().height}px`,
        left: `${label.left - startPoint}px`,
        width: `${label.width}px`
      }
    });
  }

  renderHeaders (headers) {
    return headers.map((item, idx) => {
      return React.cloneElement(item, {
        key: idx,
        active: this.props.index === idx,
        onClick: this.handleHeaderClick.bind(this, idx, item)
      });
    });
  }

  renderContents (contents) {
    return contents.map((item, idx) => {
      return React.cloneElement(item, {
        key: idx,
        active: this.props.index === idx,
        tabIndex: idx
      });
    });
  }

  render () {
    let className = 'o-tabs';
    const { headers, contents } = this.parseChildren();
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div ref='tabs' className={className}>
        <nav className='o-tabs__navigation' ref='navigation'>
          {this.renderHeaders(headers)}
        </nav>
        <span className='o-tabs__pointer' style={this.state.pointer} />
        {this.renderContents(contents)}
      </div>
    );
  }
}
