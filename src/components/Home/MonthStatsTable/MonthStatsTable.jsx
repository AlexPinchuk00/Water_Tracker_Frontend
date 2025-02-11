import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthWater } from '../../../redux/waterData/waterOperations';
import { selectMonthData } from '../../../redux/waterData/waterSelectors';
import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from 'date-fns';
import { DaysGeneralStats } from 'components';
import {
  ButtonPaginator,
  DaysButton,
  DaysList,
  DaysPercentage,
  HeaderMonth,
  Paginator,
  Year,
} from './MonthStatsTable.styled';
export const MonthStatsTable = () => {
  const dispatch = useDispatch();
  const monthData = useSelector(selectMonthData);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [activeButton, setActiveButton] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dayPosition, setDayPosition] = useState({ top: 0, left: 0, width: 0 });
  const [selectedDayStats, setSelectedDayStats] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const dayRefs = useRef({});
  // Преобразуем selectedMonth в строку 'yyyy-MM'
  const month = format(selectedMonth, 'yyyy-MM');
  console.log('Selected month (string):', month); // Логируем месяц в формате 'yyyy-MM'
  // Загрузка данных при изменении месяца
  useEffect(() => {
    console.log('useEffect: Fetching month water data for month:', month);
    if (!selectedMonth || !(selectedMonth instanceof Date)) {
      console.error('Invalid selectedMonth:', selectedMonth);
      return;
    }
    dispatch(getMonthWater(month))
      .unwrap()
      .then(data => {
        console.log('Fetched month water data:', data); // Логируем успешный ответ
      })
      .catch(error => {
        console.error('Error fetching month water data:', error); // Логируем ошибку
      });
  }, [dispatch, month]);
  const handlePreviousMonth = () => {
    console.log('Previous month button clicked');
    const newMonth = subMonths(selectedMonth, 1);
    setSelectedMonth(newMonth);
    setActiveButton(isSameMonth(newMonth, new Date()) ? null : 'prev');
  };
  const handleNextMonth = () => {
    console.log('Next month button clicked');
    if (selectedMonth < new Date()) {
      const newMonth = addMonths(selectedMonth, 1);
      setSelectedMonth(newMonth);
      setActiveButton(isSameMonth(newMonth, new Date()) ? null : 'next');
    }
  };
  const daysOfMonth = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth),
  });
  console.log('Days of month:', daysOfMonth); // Логируем дни месяца
  const monthDataMap = monthData.reduce((acc, dayData) => {
    acc[dayData.date] = dayData;
    return acc;
  }, {});
  console.log('Month data map:', monthDataMap); // Логируем данные по дням
  const onDayClick = day => {
    const dayKey = format(day, 'yyyy-MM-dd');
    const dayData = monthDataMap[dayKey];
    const isSameDaySelected = selectedDayStats?.date === dayKey;
    console.log('Day clicked:', dayKey); // Логируем выбранный день
    console.log('Day data:', dayData); // Логируем данные выбранного дня
    if (isSameDaySelected && modalVisible) {
      console.log('Closing modal for day:', dayKey);
      setModalVisible(false);
      setSelectedDayStats(null);
    } else {
      console.log('Opening modal for day:', dayKey);
      setSelectedDayStats({
        date: dayKey,
        waterVolumeSum: dayData ? dayData.waterVolumeSum : 0,
        drinkCount: dayData ? dayData.drinkCount : 0,
        waterVolumePercentage: dayData ? dayData.waterVolumePercentage : 0,
      });
      setModalVisible(true);
      const dayElement = dayRefs.current[dayKey];
      if (dayElement) {
        const rect = dayElement.getBoundingClientRect();
        setDayPosition({
          top: rect.top + window.scrollY,
          left: rect.left,
          width: rect.width,
        });
        console.log('Day element position:', rect); // Логируем позицию элемента
      }
    }
  };
  const handleCloseModal = () => {
    console.log('Modal closed');
    setModalVisible(false);
    setSelectedDayStats(null);
  };
  useEffect(() => {
    const handleClickOutside = event => {
      if (modalVisible) {
        const isClickOutside = Object.values(dayRefs.current).every(
          ref => ref && !ref.contains(event.target),
        );
        if (isClickOutside) {
          console.log('Clicked outside modal, closing modal');
          handleCloseModal();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible, selectedDayStats]);
  return (
    <div>
      <HeaderMonth>
        <h2>Month</h2>
        <Paginator
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <ButtonPaginator
            onClick={handlePreviousMonth}
            active={activeButton === 'next'}
          >
            &lt;
          </ButtonPaginator>
          <span>{format(selectedMonth, 'MMMM')}</span>
          {isHovering && (
            <Year>{format(selectedMonth, 'yyyy').split('-')[0]}</Year>
          )}
          <ButtonPaginator
            onClick={handleNextMonth}
            disabled={selectedMonth >= new Date()}
            active={activeButton === 'prev'}
          >
            &gt;
          </ButtonPaginator>
        </Paginator>
      </HeaderMonth>
      <DaysList>
        {daysOfMonth.map(day => {
          const dayKey = format(day, 'yyyy-MM-dd');
          const dayData = monthDataMap[dayKey];
          const percentage = dayData ? dayData.waterVolumePercentage : 0;
          const isHighlighted = dayData && dayData.waterVolumePercentage < 100;
          console.log('Rendering day:', dayKey, 'with data:', dayData); // Логируем рендер каждого дня
          return (
            <div key={dayKey}>
              <DaysPercentage>
                <DaysButton
                  ref={el => (dayRefs.current[dayKey] = el)}
                  onClick={() => onDayClick(day)}
                  isHighlighted={isHighlighted}
                >
                  {format(day, 'd')}
                </DaysButton>
                <span>{Math.round(percentage)}%</span>
              </DaysPercentage>
            </div>
          );
        })}
        {modalVisible && selectedDayStats && (
          <DaysGeneralStats
            stats={selectedDayStats}
            position={dayPosition}
            onClose={handleCloseModal}
            onShow={modalVisible}
          />
        )}
      </DaysList>
    </div>
  );
};
