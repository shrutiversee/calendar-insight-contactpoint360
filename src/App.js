import React from "react";
import ScheduleViewer from "./components/ScheduleViewer";
import "./App.css";

function MainApplication() {
  return (
    <div className="MainApp">
      <h1 style={{ color: "white", textAlign: "center" }}>🚀 Interactive Data Calendar Hub</h1>
      <ScheduleViewer />
    </div>
  );
}

export default MainApplication;
