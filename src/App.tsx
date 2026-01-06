import React, { useState } from 'react';
import './App.css';
import { EnergyCard } from './components/EnergyChart';
import { OptimalWindowCard } from './components/OptimalWindow/OptimalWindow';
import { useEnergyData } from './hooks/useEnergyData';
import { useOptimalWindow } from './hooks/useOptimalWindow';

/**
 * Main application component for the Energy Mix Dashboard.
 * Displays energy production data for 3 consecutive days and
 * displays the best EV charging window for next 2 days based on clean energy share.
 */
function App() {
  const [chargingDuration, setChargingDuration] = useState<number>(3);
  const { energyData, loading: energyLoading, error: energyError, refetch } = useEnergyData();
  const { optimalWindow, loading: windowLoading, error: windowError, fetchWindow } = useOptimalWindow();

  const handleFindOptimalWindow = () => {
    fetchWindow(chargingDuration);
  };

  return (
    <div className="App">
      <header>
        <div className='header-box'>
          <h1>Energy Mix Dashboard</h1>
          <p>Show energy production for 3 consecutive days.</p>
        </div>
      </header>

      <div className="main-content-container">
        {/* Energy Mix Section - displays 3 day cards with pie charts */}
        <section className="energy-mix-section">
          {energyLoading && (
            <div className="loading-banner">
              <p>Loading data...</p>
            </div>
          )}

          {energyError && (
            <button onClick={refetch} className="loading-banner error">
              <p>{energyError}</p>
              <p className="retry-text">Click to retry</p>
            </button>
          )}

          <div className="charts-container">
            {/* Skeleton cards while loading or on error */}
            {(energyLoading || energyError) ? (
              <>
                <div className="energy-card-skeleton" />
                <div className="energy-card-skeleton" />
                <div className="energy-card-skeleton" />
              </>
            ) : energyData ? (
              energyData.days.map((day) => (
                <EnergyCard
                  key={day.date}
                  date={day.date}
                  sources={day.sources}
                  cleanEnergyPercent={day.cleanEnergyPercent}
                  loading={false}
                />
              ))
            ) : null}
          </div>
        </section>

        {/* Optimal Window Section - find best charging window for EV */}
        <section className='optimal-window-section'>
          <OptimalWindowCard
            optimalWindow={optimalWindow}
            loading={windowLoading}
            error={windowError}
            chargingDuration={chargingDuration}
            onDurationChange={setChargingDuration}
            onFind={handleFindOptimalWindow}
          />
        </section>
      </div>

      <footer className="footer">
        <p>© 2026 Dawid Jarosz | Codibly IT Academy Recruitment Task</p>
      </footer>
    </div>
  );
}

export default App;