import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { fetchEvents } from '../actions/index.js';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

class CalendarContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      events: []
    };
  }

  async componentWillMount(){
    try{
      await this.props.fetchEvents(this.props.userInfo.id);
      await this.props.events.forEach((event) => {
        // console.log("inside calendar container", event);
        const calendarEvent = {
          id: event.id,
          title: event.title,
          start: new Date(event.year, event.month, event.day, event.start_hour, event.start_minute, event.second),
          end: new Date(event.year, event.month, event.day, event.end_hour, event.end_minute, event.second),
          desc: event.description
        }

        this.state.events.push(calendarEvent);
      });
      this.setState({});
    } catch (err) {
      return err;
    }
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent);
    this.setState({
      events: nextEvents,
    });
  }

  resizeEvent(resizeType, { event, start, end }){
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    });

    this.setState({
      events: nextEvents,
    });
  }

  render(){
    return(
      <div className="calendarContainer">
        <DnDCalendar 
          defaultDate={new Date()}
          defaultView="week"
          events={this.state.events}
          onEventDrop={this.moveEvent.bind(this)}
          onEventResize={this.resizeEvent.bind(this)}
          resizable
          style={{ height: "75vh", margin: '2%', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 60px, rgba(0, 0, 0, 0.22) 0px 15px 20px' }}
          views={['month', 'week', 'day']}
        />
      </div>
    );
  }
}

CalendarContainer = DragDropContext(HTML5Backend)(CalendarContainer);

const mapStateToProps = function(state) {
  return {
    userInfo: state.auth.user,
    events: state.events.events
  };
}; 

export default connect(mapStateToProps, { fetchEvents })(CalendarContainer);
