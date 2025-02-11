import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import {DaysGeneralStats} from '../DaysGeneralStats/DaysGeneralStats';


export const MonthStatsTable = ({ monthDataMap }) => {
  const [selectedDayStats, setSelectedDayStats] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dayPosition, setDayPosition] = useState({ top: 0, left: 0, width: 0 });
  const dayRefs = useRef({});
  const onDayClick = day => {
    const dayKey = format(day, 'yyyy-MM-dd');
    const dayData = monthDataMap[dayKey];
    const isSameDaySelected = selectedDayStats?.date === dayKey;
    if (isSameDaySelected && modalVisible) {
      setModalVisible(false);
      setSelectedDayStats(null);
    } else {
      setSelectedDayStats({
        date: dayKey,
        waterVolumeSum: dayData?.waterVolumeSum ?? 0,
        drinkCount: dayData?.drinkCount ?? 0,
        waterVolumePercentage: dayData?.waterVolumePercentage ?? 0,
      });
      setModalVisible(true);
    }
    // Установка позиции для модального окна
    const dayElement = dayRefs.current[dayKey];
    if (dayElement) {
      const rect = dayElement.getBoundingClientRect();
      setDayPosition({
        top: rect.top + window.scrollY,
        left: rect.left,
        width: rect.width,
      });
    }
  };
  // Закрытие модалки при клике вне элемента
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalVisible &&
        selectedDayStats &&
        dayRefs.current[selectedDayStats.date] &&
        !dayRefs.current[selectedDayStats.date].contains(event.target)
      ) {
        setModalVisible(false);
        setSelectedDayStats(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible, selectedDayStats]);
  return (
    <div>
      {Object.keys(monthDataMap).map(dayKey => {
        const dayData = monthDataMap[dayKey];
        return (
          <div
            key={dayKey}
            ref={el => (dayRefs.current[dayKey] = el)}
            onClick={() => onDayClick(new Date(dayKey))}
          >
            {dayKey}: {dayData?.waterVolumePercentage ?? 0}%
          </div>
        );
      })}
      {modalVisible && selectedDayStats && (
        <DaysGeneralStats
          stats={selectedDayStats}
          position={dayPosition}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};
