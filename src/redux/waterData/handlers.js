import { format } from 'date-fns';

const handleProgress = state => {
  const currentAmount = state.today.dailyWaterList.reduce(
    (acc, entry) => acc + entry.amount,
    0,
  );
  const progress = ((currentAmount / state.today.dailyGoal) * 100).toFixed(0);

  state.today.progress = progress < 100 ? progress + '%' : '100%';
};

export const handlerAddWater = (state, { payload: { _id, time, amount } }) => {
  state.today.dailyWaterList.push({ _id, time, amount });
  handleProgress(state);

  const today = new Date().toISOString().slice(0, 10);
  const dayToUpd = state.month.find(item => item.date === today);

  if (dayToUpd) {
    dayToUpd.entriesCount += 1;
    dayToUpd.percentage = state.today.progress;
  } else {
    state.month.push({
      date: today,
      dailyGoal: (state.today.dailyGoal / 1000).toFixed(1) + ' L',
      percentage: state.today.progress,
      entriesCount: 1,
    });
    return;
  }

  state.month = state.month.map(day =>
    day.date === dayToUpd.date ? dayToUpd : day,
  );
};

export const handleEditWater = (state, { payload }) => {
  const array = state.today.dailyWaterList;
  const idx = array.findIndex(item => item._id === payload._id);

  if (idx !== -1) {
    array[idx] = payload;
  }

  handleProgress(state);

  const today = new Date().toISOString().slice(0, 10);
  const dayToUpd = state.month.find(item => item.date === today);

  if (dayToUpd) {
    dayToUpd.percentage = state.today.progress;
  }

  state.month = state.month.map(day =>
    day.date === dayToUpd.date ? dayToUpd : day,
  );
};

export const handlerDeleteWater = (state, { payload }) => {
  state.today.dailyWaterList = state.today.dailyWaterList.filter(
    data => data._id !== payload,
  );

  handleProgress(state);

  const today = new Date().toISOString().slice(0, 10);
  if (state.today.dailyWaterList.length === 0) {
    state.month = state.month.filter(item => item.date !== today);
    return;
  }

  const dayToUpd = state.month.find(item => item.date === today);

  if (dayToUpd) {
    dayToUpd.entriesCount -= 1;
    dayToUpd.percentage = state.today.progress;
  }

  state.month = state.month.map(day =>
    day.date === dayToUpd.date ? dayToUpd : day,
  );
};

export const handleGetTodayWater = (state, { payload }) => {
  state.today.dailyWaterList = payload.entries;
  state.today.dailyGoal = payload.dailyGoal;
  state.today.progress = payload.progress;
};

// export const handlerUpdateNorma = (state, { payload }) => {
//   state.today.dailyGoal = payload.dailyGoal;
//   handleProgress(state);

//   const today = new Date().toISOString().slice(0, 10);
//   const dayToUpd = state.month.find(item => item.date === today);

//   if (dayToUpd) {
//      dayToUpd.percentage = state.today.progress;
//   } 

//   state.month = state.month.map(day =>
//     day.date === dayToUpd.date ? dayToUpd : day,
//   );
 
// };

export const handlerUpdateNorma = (state, { payload }) => {
  state.today.dailyGoal = payload;
  handleProgress(state);

  const today = new Date().toISOString().slice(0, 10);
  const dayToUpd = state.month.find(item => item.date === today);

  dayToUpd.percentage = state.today.progress;
  dayToUpd.dailyGoal = (payload / 1000).toFixed(1) + ' L';

  state.month = state.month.map(day =>
    day.date === dayToUpd.date ? dayToUpd : day
  );
};



export const handleGetMonthWater = (state, { payload }) => {
  const formattedMonth = payload.data.map(item => ({
    ...item,
    date: format(`${payload.year},${item.date}`, 'yyyy-MM-dd'),
  }));
  state.month = formattedMonth;
};
