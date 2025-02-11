export const handlerAddWater = (
  state,
  { payload: { _id, time, amount } },
) => {
  state.today.dailyWaterList.push({ _id, time, amount });
  state.today.dailyGoal += amount;
};

export const handleEditWater = (state, { payload }) => {
  const array = state.today.dailyWaterList;
  const idx = array.findIndex(item => item._id === payload._id);

  if (idx !== -1) {
    array[idx] = payload;
  }

  state.today.dailyGoal = array.reduce(
    (acc, item) => acc + item.waterVolume,
    0,
  );
};

export const handlerDeleteWater = (state, { payload }) => {
  state.today.dailyWaterList = state.today.dailyWaterList.filter(
    data => data._id !== payload,
  );

  const array = state.today.dailyWaterList;

  state.today.dailyGoal = array.reduce(
    (acc, item) => acc + item.waterVolume,
    0,
  );
};

export const handleGetTodayWater = (state, { payload }) => {
  state.today.dailyWaterList = payload.entries;
  state.today.dailyGoal = payload.dailyGoal;
  state.today.progress = payload.progress;
};

export const handleGetMonthWater = (state, { payload }) => {
  state.month = payload;
};
