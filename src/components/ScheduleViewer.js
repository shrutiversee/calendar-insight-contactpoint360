import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { setActiveDate, setScheduleData } from "../redux/scheduleSlice";
import { sampleMetrics } from "../data/sampleMetrics";
import ChartDisplayModal from "./ChartDisplayModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment);

const ScheduleViewer = () => {
  const dispatch = useDispatch();
  const activeDate = useSelector((state) => state.schedule.activeDate);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Load sample metrics into redux
    dispatch(setScheduleData(sampleMetrics));
  }, [dispatch]);

  const scheduleEvents = Object.keys(sampleMetrics).map((date) => ({
    title: "Data Available",
    start: new Date(date),
    end: new Date(date),
  }));

  const handleSelectSlot = ({ start }) => {
    const formattedDate = moment(start).format("YYYY-MM-DD");
    dispatch(setActiveDate(formattedDate));
    if (sampleMetrics[formattedDate]) {
      setModalOpen(true);
    } else {
      toast.error("No data found for the selected date.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSelectEvent = (event) => {
    const formattedDate = moment(event.start).format("YYYY-MM-DD");
    dispatch(setActiveDate(formattedDate));
    setModalOpen(true);
  };

  return (
    <div className="schedule-wrapper">
      <div className="schedule-header">
        <h2>📅 Interactive Data Calendar</h2>
        <p>Click on any date to view metrics or get notifications</p>
      </div>
      <Calendar
        localizer={localizer}
        events={scheduleEvents}
        startAccessor="start"
        endAccessor="end"
        className="elegant-schedule"
        style={{ height: 600, margin: "20px" }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        selectable={true}
        selected={activeDate ? new Date(activeDate) : null}
      />
      {modalOpen && (
        <ChartDisplayModal
          date={activeDate}
          onClose={() => setModalOpen(false)}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ScheduleViewer;
