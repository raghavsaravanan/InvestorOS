import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';
import styles from './DemandZoneAnalyzer.module.css';

export default function DemandZoneAnalyzer() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const zones = [
    { price: '$145.23 - $147.89', strength: '8/10', touches: '3 touches', age: '5 days old' },
    { price: '$138.45 - $141.12', strength: '7/10', touches: '2 touches', age: '3 days old' },
    { price: '$132.78 - $135.34', strength: '9/10', touches: '4 touches', age: '7 days old' },
  ];

  return (
    <div className={styles.container}>
      <nav className={`${styles.nav} ${isLoaded ? styles.navLoaded : ''}`}>
        <div className={styles.navContent}>
          <button className={styles.backButton} onClick={() => navigate('/legion')}>
            <span style={{ fontSize: '18px' }}>←</span> Back to Legion
          </button>
          <h1 className={styles.navTitle} style={{ fontFamily: 'Italiana, serif' }}>
            Demand Zone Analyzer
          </h1>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={`${styles.hero} ${isLoaded ? styles.heroLoaded : ''}`}>
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle} style={{ fontFamily: 'Italiana, serif' }}>
              Demand Zone Analyzer
            </h2>
            <p className={styles.heroSubtitle} style={{ fontFamily: 'Aboreto, serif' }}>
              Advanced technical analysis tool for identifying high-probability demand zones
            </p>
          </div>
        </section>

        <section className={`${styles.interface} ${isLoaded ? styles.interfaceLoaded : ''}`}>
          <div className={styles.interfaceContent}>
            <aside className={styles.inputPanel}>
              <h3 className={styles.panelTitle} style={{ fontFamily: 'Italiana, serif' }}>
                Analysis Parameters
              </h3>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Symbol</label>
                <input className={styles.input} type="text" placeholder="e.g., AAPL, TSLA, BTC-USD" />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Timeframe</label>
                <select className={styles.select}>
                  <option>1 Minute</option>
                  <option>5 Minutes</option>
                  <option>15 Minutes</option>
                  <option>1 Hour</option>
                  <option selected>1 Day</option>
                  <option>1 Week</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Lookback Period</label>
                <input className={styles.input} type="number" defaultValue={50} min={1} max={500} />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Min Zone Strength</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input className={styles.slider} type="range" min={1} max={10} value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
                  <span className={styles.sliderValue}>{sliderValue}</span>
                </div>
              </div>

              <button className={styles.analyzeButton}>Analyze Demand Zones</button>
            </aside>

            <section className={styles.resultsPanel}>
              <h3 className={styles.panelTitle} style={{ fontFamily: 'Italiana, serif' }}>
                Analysis Results
              </h3>

              <div className={styles.chartContainer}>
                <div className={styles.chartPlaceholder}>
                  <BarChart3 size={48} color="#e6d7c3" />
                  <p>Interactive Chart</p>
                  <span>Chart visualization will appear here</span>
                </div>
              </div>

              <div className={styles.zonesList}>
                {zones.map((zone, index) => (
                  <div key={index} className={styles.zoneItem}>
                    <div className={styles.zoneInfo}>
                      <span className={styles.zonePrice}>{zone.price}</span>
                      <span className={styles.zoneStrength}>Strength: {zone.strength}</span>
                    </div>
                    <div className={styles.zoneDetails}>
                      <span className="zoneTouches">{zone.touches}</span>
                      <span className="zoneAge">{zone.age}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className={`${styles.features} ${isLoaded ? styles.featuresLoaded : ''}`}>
          <div className={styles.featuresContent}>
            <h3 className={styles.sectionTitle} style={{ fontFamily: 'Italiana, serif' }}>
              Key Features
            </h3>
            <div className={styles.featuresGrid}>
              <article className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <TrendingUp size={32} />
                </div>
                <h4>Smart Detection</h4>
                <p>Advanced algorithms identify high-probability demand zones based on price action and volume analysis</p>
              </article>

              <article className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <Activity size={32} />
                </div>
                <h4>Real-time Analysis</h4>
                <p>Get instant insights as market conditions change with live data processing and zone updates</p>
              </article>

              <article className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <BarChart3 size={32} />
                </div>
                <h4>Multi-Timeframe</h4>
                <p>Analyze demand zones across multiple timeframes to identify confluence and strengthen your trading decisions</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
