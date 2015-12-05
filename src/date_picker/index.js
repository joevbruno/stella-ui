import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import time from '../utils/time';
import events from '../utils/events';
import CalendarDialog from './dialog';
import Input from '../input';

@mixin(PureRenderMixin)
export default class DatePicker extends React.Component {
  static displayName = 'DatePicker';
  static propTypes = {
    className: React.PropTypes.string,
    value: React.PropTypes.object
  };
  static defaultProps = {
    className: ''
  }
  constructor(props) {
    super(props);
    this.value = this.props.value;
  }
  openCalendarDialog = (event) => {
    events.pauseEvent(event);
    this.refs.dialog.show();
  }
  onDateSelected = (value) => {
    this.refs.input.setValue(this.formatDate(value));
    this.setState({value: value});
  }
  formatDate(date) {
    return `${date.getDate()} ${time.getFullMonth(date)} ${date.getFullYear()}`;
  }
  render() {
      return (
        <div className="o-datepicker">
          <Input
            ref='input'
            type='text'
            readOnly={true}
            className='o-datepicker__input'
            onMouseDown={this.openCalendarDialog}
            placeholder='Pick up date'
            value={this.state.value ? this.formatDate(this.state.value) : null}
          />
          <CalendarDialog
            ref='dialog'
            initialDate={this.state.value}
            onDateSelected={this.onDateSelected}
          />
        </div>
      );
  }
}
