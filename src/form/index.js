import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import mixin from 'mixin-decorator';
import Input from '../input';
import Button from '../button';
import Dropdown from '../dropdown';
// import Autocomplete from '../autocomplete';
// import Checkbox from '../checkbox';
// import DatePicker from '../date_picker';
// import RadioGroup from '../radio_group';
// import Slider from '../slider';
// import Switch from '../switch';
// import TimePicker from '../time_picker';

function getState() {
  return {
    data: {},
    formValid: false
  };
}

export default class Form extends React.Component {
  static displayName = 'Form';
  static propTypes = {
    attributes: React.PropTypes.array.isRequired,
    validation: React.PropTypes.func,
    patterns: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    addSubmitButton: React.PropTypes.any,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    removeDivider: React.PropTypes.bool,
    onError: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onValid: React.PropTypes.func,
    children: React.PropTypes.any
  };
  static defaultProps = {
    attributes: [],
    className: ''
  };
  constructor(props) {
    super(props);
    this.state = getState();
  }
  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
      window.localStorage.removeItem(this.props.name);
    }
  }
  onChange = (key, event) => {
    let val;
    console.log(key, event.target.value);
    if (typeof key === 'object' ) {
      val = key.val;
      key = key.key;
    } else {
     val = event.target.value;
    }
    let isFormValid = false;
    const dataState = this.state.data || {};
    console.log(key);
    dataState[key] = {};
    dataState[key].value = val;
console.log(dataState);
    if (this.props.validation) {
      const isValid = this.props.validation(val, key);
      dataState[key].valid = isValid.bool;
      dataState[key].error = isValid.message;
    } else {
      dataState[key].valid = true;
    }

    if (this.props.patterns) {
      dataState[key].formattedValue = this.props.patterns(val, key);
    }

    const formAttrs = this.props.attributes.filter( (attr) => {
      if ((attr.component !== 'Button' || attr.component !== 'Divider') && (dataState[attr.name] && !dataState[attr.name].valid)) {
        return attr;
      }
    });

    return Promise.resolve(formAttrs).then( (attrs) => {
      if (attrs.length === 0) {
        isFormValid = true;
      }
      const updatedState = {
        data: dataState,
        formValid: isFormValid
      };
      window.localStorage.setItem(this.props.name, JSON.stringify(updatedState));
      if (this.props.onChange) {
        this.props.onChange(key, val, event);
      }
      this.setState(updatedState);
    });
  }
  constructAttributes = () => {
    let storedValues = {};
    if (window.localStorage.getItem(this.props.name)) {
      storedValues = JSON.parse(window.localStorage.getItem(this.props.name));
    }
    let button = { type: 'submit', label: 'Submit', disabled: false, component: 'Button' };
    let attributes = this.props.attributes;
    if (attributes && typeof attributes[0] === 'object') {
      attributes = [attributes];
    }
    let flattened = attributes.reduce( (a, b) => {
      if (!this.props.removeDivider && attributes.length > 1) {
        a.push({component: 'divider'});
      }
      return a.concat(b);
    });
    if (this.props.addSubmitButton
      && typeof this.props.addSubmitButton === 'object') {
      button = this.props.addSubmitButton;
    } else if (!this.props.addSubmitButton) {
      button = null;
    }

    if (button) {
      flattened = flattened.concat(button);
    }

    return flattened.map( (attr) => {
      if (storedValues && storedValues[attr.name]) {
        attr.value = storedValues[attr.name];
      }
      if (this.state.data && this.state.data[attr.name] && this.state.data[attr.name].value) {
        attr.value = this.state.data[attr.name].value;
      }
      if (this.state.data &&  this.state.data[attr.name] && this.state.data[attr.name].formatted) {
        attr.value = this.state.data[attr.name].formatted;
      }
      console.log(attr, this.state.data);
      return attr;
    });
  }
  render() {
    const className = this.props.className ? `${this.props.className}` : 'o-form';
    const attributes = this.constructAttributes(this.props.attributes).map( (attribute, index) => {
      console.log(attribute, 'rendering');
      if (attribute.component === 'Button') {
        attribute.disabled = !this.state.formValid;
        return <Button key={index} {...attribute} />;
      } else if (attribute.component === 'Input') {
        return <Input key={index} {...attribute} onChange={this.onChange} />;
      } else if (attribute.component === 'Dropdown') {
        return <Dropdown key={index} {...attribute} onChange={this.onChange}/>;
      }
    });
    return (
      <form className={className} onSubmit={this.onSubmit}>
        { attributes }
        { this.props.children }
      </form>
    );
  }
}


 // // if (attribute.type === 'autocomplete') {
 //      //   return <Autocomplete key={index} {...attribute} onChange={this.onChange}/>;
 //      // } else
 //      if (attribute.type === 'submit') {
 //        attribute.disabled = !this.state.formValid;
 //        return <Button key={index} {...attribute} type='flat' ref='submit' onClick={this.onSubmit}/>;

 //      // } else if (attribute.type === 'checkbox') {
 //      //   return <Checkbox key={index} {...attribute} onChange={this.onChange}/>;
 //      // } else if (attribute.type === 'date_picker') {
 //      //   return <DatePicker key={index} {...attribute} onChange={this.onChange}/>;
 //      }
 //      // else if (attribute.type === 'radio_group') {
 //      //   return <RadioGroup key={index} {...attribute} onChange={this.onChange}/>;
 //      // } else if (attribute.type === 'slider') {
 //      //   return <Slider key={index} {...attribute} onChange={this.onChange}/>;
 //      // } else if (attribute.type === 'switch') {
 //      //   return <Switch key={index} {...attribute} onChange={this.onChange}/>;
 //      // } else if (attribute.type === 'time_picker') {
 //      //   return <TimePicker key={index} {...attribute} onChange={this.onChange}/>;
 //      } else if (attribute.type === 'markdown') {
 //        return <Markdown key={index} {...attribute} change={this.onChange}/>;
 //    } else {
 //        return <Input key={index} {...attribute} change={this.onChange} />;
 //      }
 //    });
