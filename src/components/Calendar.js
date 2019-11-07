import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useState } from "react";
import Modal from "./Modal";

function MyCalendar() {
  const [eventList, setEventList] = useState([]);
  const [show, setShow] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [selected, setSelected] = useState();

  const localizer = momentLocalizer(moment);

  const handleSelect = event => {
    const diffTime = Math.abs(event.end - event.start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const startClone = new Date(event.start.getTime());
    const endClone = new Date(event.end.getTime());
    if (
      (diffDays > 0 &&
        event.end.getHours() === 0 &&
        event.end.getMinutes() === 0) ||
      event.start.getTime() === event.end.getTime()
    ) {
      endClone.setHours(23);
      endClone.setMinutes(59);
    }
    setStart(startClone);
    setEnd(endClone);
    setShow(true);
  };

  const handleSelectEvent = event => {
    setSelected(event);
    setShow(true);
  };

  const addEvent = myEvent => {
    let events = [...eventList];
    if (selected) {
      events = events.filter(
        el =>
          !(
            el.title === selected.title &&
            el.start === selected.start &&
            el.end === selected.end
          )
      );
    }
    events.push(myEvent);
    setSelected();
    setEventList(events);
  };

  const deleteEvent = () => {
    let events = [...eventList];
    events = events.filter(
      el =>
        !(
          el.title === selected.title &&
          el.start === selected.start &&
          el.end === selected.end
        )
    );
    setSelected();
    setEventList(events);
  };

  return (
    <div className="container">
      <div className="myCalendar">
        <Calendar
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          views={["week", "month"]}
          style={{ height: "70vh", width: "50vw" }}
          selectable={true}
          onSelectSlot={handleSelect}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <Modal
        show={show}
        setShow={setShow}
        selected={selected}
        start={start}
        end={end}
        addEvent={addEvent}
        deleteEvent={deleteEvent}
        setSelected={setSelected}
      />
    </div>
  );
}

export default MyCalendar;
