import React from 'react';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { TrendChart } from './components/TrendChart';
import { SnapshotChart } from './components/SnapshotChart';
import { HistoryTable } from './components/HistoryTable';
import { StatusFooter } from './components/StatusFooter';
import { useSensorData } from './hooks/useSensorData';

export default function App() {
  const { latest, history, total } = useSensorData();

  const getCO2Status = (v: number) => {
    if (v < 600) return { label: 'GOOD', color: 'var(--color-accent)', badge: 'badge-good' };
    if (v < 1000) return { label: 'MODERATE', color: 'var(--color-warn)', badge: 'badge-mod' };
    return { label: 'HIGH', color: 'var(--color-danger)', badge: 'badge-bad' };
  };

  const co2Status = getCO2Status(latest.co2);

  return (
    <div className="min-h-screen pb-20">
      <Header timestamp={latest.timestamp} totalRecords={total} />
      
      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-10">
        {/* Live Readings Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-semibold text-[10px] tracking-[0.2em] uppercase text-dim">
              Live Readings
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="CO₂"
              value={latest.co2}
              unit="ppm"
              color={co2Status.color}
              accentColor={co2Status.color}
              progress={(latest.co2 / 2000) * 100}
              badge={co2Status.label}
              badgeClass={
                co2Status.label === 'GOOD' ? 'text-accent border-accent bg-accent/5' :
                co2Status.label === 'MODERATE' ? 'text-warn border-warn bg-warn/5' :
                'text-danger border-danger bg-danger/5'
              }
            />
            <StatCard
              label="Temperature"
              value={latest.temperature}
              unit="°C"
              color="#c94e24"
              accentColor="#e85d2f"
              subValue="Thermal Stability: Nominal"
            />
            <StatCard
              label="Humidity"
              value={latest.humidity}
              unit="%"
              color="#1a7fc1"
              accentColor="#1a7fc1"
              subValue="Dew Point: 12.4°C"
            />
            <StatCard
              label="Location"
              value={latest.room}
              unit=""
              color="var(--color-accent-dark)"
              accentColor="var(--color-accent-dark)"
              subValue={`Topic: ${latest.topic}`}
              className="font-display"
            />
          </div>
        </section>

        {/* Latest Packet Detail */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-semibold text-[10px] tracking-[0.2em] uppercase text-dim">
              Latest Packet
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <div className="glass-panel p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { label: 'Timestamp', value: latest.timestamp },
              { label: 'Topic', value: latest.topic },
              { label: 'Room', value: latest.room },
              { label: 'CO₂', value: `${latest.co2} ppm` },
              { label: 'Temperature', value: `${latest.temperature} °C` },
              { label: 'Humidity', value: `${latest.humidity} %` },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-[9px] tracking-widest uppercase text-dim font-bold">
                  {item.label}
                </span>
                <span className="text-sm font-mono truncate">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Trend Graphs */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-semibold text-[10px] tracking-[0.2em] uppercase text-dim">
              Trend Analysis
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TrendChart data={history} />
            </div>
            <div>
              <SnapshotChart latest={latest} />
            </div>
          </div>
        </section>

        {/* Recent History Table */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display font-semibold text-[10px] tracking-[0.2em] uppercase text-dim">
              Recent History
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <HistoryTable history={history} />
        </section>
      </main>

      <StatusFooter />
    </div>
  );
}
