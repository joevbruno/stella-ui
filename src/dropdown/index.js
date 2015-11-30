import React from 'react';
import Ripple from '../ripple';

function getState() {
  return {
    active: false,
  };
}

export default class Dropdown extends React.Component {
    displayName = 'Dropdown';
    static propTypes = {
      className: React.PropTypes.string,
      dataSource: React.PropTypes.array,
      disabled: React.PropTypes.bool,
      label: React.PropTypes.string,
      onChange: React.PropTypes.func,
      template: React.PropTypes.func,
      value: React.PropTypes.any
    };

    static defaultProps = {
      className: '',
      dataSource: [],
      up: false
    };
    constructor(props) {
      super(props);
      this.state = getState();
    }
    handleOpenPosition = (event) => {
      const client = event.target.getBoundingClientRect();
      const screenHeight = window.innerHeight || document.documentElement.offsetHeight;
      this.setState({
        active: true,
        up: client.top > ((screenHeight / 2) + client.height)
      });
    };
    renderValues = () => {
      const items = this.props.dataSource.map( (item, index) => {
        let className;
        if (item.value === this.props.value) className = `select-item is-selected`;
        return (
          <li key={index} className={className} onClick={this.props.onChange.bind(this, {key: this.props.name, val: item.value})} >
            { this.props.template ? this.props.template(item) : item.label }
            <Ripple />
          </li>
        );
      });

      let className = 'dropdown__values';
      if (this.state.up) className += ' is-up';
      return <ul ref="values" className={className} >{ items }</ul>;
    };
    render() {
      let className = 'dropdown';
      let labelIndex = 0;
      this.props.dataSource.forEach( (item, index) => {
        if (item.value === this.state.value) { labelIndex = index; }
      });
      if (this.props.className) className += `${this.props.className}`;
      if (this.props.disabled) className += ' is-disabled';
      if (this.state.active) className += ' is-active';

      return (
        <div className={className}>
          {this.props.value}
            {this.props.label ? <label className="dropdown__label">{this.props.label}</label> : null}
            { this.renderValues() }
            <div ref="value" className="dropdown__value" onClick={this.handleClick}>
                { this.props.template ? this.props.template(this.state.value) : <span>{this.props.dataSource[labelIndex].label}</span> }
            </div>
        </div>
      );
    }
}
