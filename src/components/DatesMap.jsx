import React from "react";
import moment from "moment";
import "moment/locale/th";
import {Calendar, momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const UnavailableDatesMap = ({unavailableTimes = [], onSlotSelect}) => {
  console.log(unavailableTimes);
  const events = unavailableTimes.map((unavailableTime) => ({
    start: new Date(unavailableTime.start),
    end: new Date(unavailableTime.end),
    title: unavailableTime.username,
  }));

  const handleSlotSelect = (slotInfo) => {
    console.log("Selected slot:", slotInfo);
    // onSlotSelect(slotInfo);
  };
  const handleEventClick = ({start, end}) => {
    console.log("Event clicked:", start, end);
    // You can perform any action you want when the event is clicked
  };
  return (
    <div className="calendar" style={{height: "500px"}}>
      {unavailableTimes.length > 0 ? (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week"]}
          style={{borderWidth: "2px", borderColor: "gray"}}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: "red",
              opacity: 0.8,
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
            },
            onClick: () => {
              handleEventClick(event);
            },
          })}
          selectable={true}
          onSelectSlot={handleSlotSelect}
          components={{
            event: ({event}) => {
              return (
                <div>
                  <span>{event.title}</span>
                </div>
              );
            },
          }}
        />
      ) : (
        <p style={{textAlign: "center"}}>No unavailable times to display.</p>
      )}
    </div>
  );
};

export default UnavailableDatesMap;
