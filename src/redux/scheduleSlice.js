import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeDate: null,
  scheduleData: {},
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setActiveDate: (state, action) => {
      state.activeDate = action.payload;
    },
    setScheduleData: (state, action) => {
      state.scheduleData = action.payload;
    },
  },
});

export const { setActiveDate, setScheduleData } = scheduleSlice.actions;
export default scheduleSlice.reducer;
