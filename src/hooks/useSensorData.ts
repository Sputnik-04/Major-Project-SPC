import { useState, useEffect, useCallback } from 'react';
import { SensorReading, DashboardData } from '../types';

const ROOMS = ['Lab-01', 'Server-Room', 'Office-A', 'Conference-B'];
const TOPICS = ['bms/sensors/air', 'bms/sensors/climate'];

function generateReading(): SensorReading {
  const now = new Date();
  return {
    timestamp: now.toLocaleTimeString('en-GB', { hour12: false }),
    topic: TOPICS[Math.floor(Math.random() * TOPICS.length)],
    room: ROOMS[Math.floor(Math.random() * ROOMS.length)],
    co2: Math.floor(400 + Math.random() * 800),
    temperature: parseFloat((20 + Math.random() * 10).toFixed(1)),
    humidity: Math.floor(30 + Math.random() * 40),
  };
}

export function useSensorData() {
  const [data, setData] = useState<DashboardData>({
    latest: generateReading(),
    history: [],
    total: 0,
  });

  const updateData = useCallback(() => {
    const newReading = generateReading();
    setData((prev) => {
      const newHistory = [newReading, ...prev.history].slice(0, 20);
      return {
        latest: newReading,
        history: newHistory,
        total: prev.total + 1,
      };
    });
  }, []);

  useEffect(() => {
    // Initial history
    const initialHistory = Array.from({ length: 10 }, generateReading);
    setData(prev => ({
      ...prev,
      history: initialHistory,
      latest: initialHistory[0],
      total: 10
    }));

    const interval = setInterval(updateData, 3000);
    return () => clearInterval(interval);
  }, [updateData]);

  return data;
}
