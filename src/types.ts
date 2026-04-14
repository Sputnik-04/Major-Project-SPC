export interface SensorReading {
  timestamp: string;
  topic: string;
  room: string;
  co2: number;
  temperature: number;
  humidity: number;
}

export interface DashboardData {
  latest: SensorReading;
  history: SensorReading[];
  total: number;
}
