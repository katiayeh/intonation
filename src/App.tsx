import { useState } from 'react';
import { Scales } from './components/Scales';
import { Comparison } from './components/Comparison';
import { Beats } from './components/Beats';
import { Methodology } from './components/Methodology';
import { Home } from './components/Home';
import { Overtones } from './components/Overtones';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useI18n } from './i18n/hooks';
import './App.css';

type Tab = 'methodology'|'scales' | 'comparison' | 'beats' | 'overtones' |'Home';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const { t } = useI18n();

  return (
    <div className="app" style={{ position: 'relative' }}>
      <LanguageSwitcher />
      <header>
        <h1>Intonation</h1>
        <nav>
        <button
            className={activeTab === 'Home' ? 'active' : ''}
            onClick={() => setActiveTab('Home')}
          >
            {t('tabHome')}
          </button>
        <button
            className={activeTab === 'methodology' ? 'active' : ''}
            onClick={() => setActiveTab('methodology')}
          >
            {t('tabMethodology')}
          </button>
          <button
            className={activeTab === 'scales' ? 'active' : ''}
            onClick={() => setActiveTab('scales')}
          >
            {t('tabScales')}
          </button>
          <button
            className={activeTab === 'comparison' ? 'active' : ''}
            onClick={() => setActiveTab('comparison')}
          >
            {t('tabComparison')}
          </button>
          <button
            className={activeTab === 'beats' ? 'active' : ''}
            onClick={() => setActiveTab('beats')}
          >
            {t('tabBeats')}
          </button>
          <button
            className={activeTab === 'overtones' ? 'active' : ''}
            onClick={() => setActiveTab('overtones')}
          >
            {t('tabOvertones')}
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'scales' && <Scales />}
        {activeTab === 'Home' && <Home />}
        {activeTab === 'comparison' && <Comparison />}
        {activeTab === 'beats' && <Beats />}
        {activeTab === 'overtones' && <Overtones />}
        {activeTab === 'methodology' && <Methodology />}
      </main>
    </div>
  );
}

export default App;
