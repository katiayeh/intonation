import { useState } from 'react';
import { Scales } from './components/Scales';
import { Comparison } from './components/Comparison';
import { Beats } from './components/Beats';
import './App.css';

type Tab = 'scales' | 'comparison' | 'beats';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('scales');

  return (
    <div className="app">
      <header>
        <h1>Intonation</h1>
        <nav>
          <button
            className={activeTab === 'scales' ? 'active' : ''}
            onClick={() => setActiveTab('scales')}
          >
            Gammes
          </button>
          <button
            className={activeTab === 'comparison' ? 'active' : ''}
            onClick={() => setActiveTab('comparison')}
          >
            Comparaison
          </button>
          <button
            className={activeTab === 'beats' ? 'active' : ''}
            onClick={() => setActiveTab('beats')}
          >
            Battements
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'scales' && <Scales />}
        {activeTab === 'comparison' && <Comparison />}
        {activeTab === 'beats' && <Beats />}
      </main>
    </div>
  );
}

export default App;
