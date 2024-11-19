import React from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Fighter } from './components/Fighter';
import { fighters } from './data/fighters';
import { Trophy, Search } from 'lucide-react';

function App() {
  const handleGoogleSearch = () => {
    window.open('https://affpa.top/L?tag=d_3855495m_97c_&site=3855495&ad=97', '_blank');
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-100">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsTeam",
              "name": "Top 10 MMA Fighters",
              "description": "Comprehensive guide to the most influential MMA fighters of the last decade",
              "sport": "Mixed Martial Arts",
              "member": fighters.map(fighter => ({
                "@type": "Person",
                "name": fighter.name,
                "description": fighter.description
              }))
            })}
          </script>
        </Helmet>

        <Navigation fighters={fighters.map(f => ({ id: f.id, name: f.name }))} />
        
        <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Top 10 MMA Fighters of the Decade
            </h1>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center text-xl text-gray-600">
                <Trophy className="w-6 h-6 mr-2" />
                <span>Legends of the Octagon</span>
              </div>
              <button
                onClick={handleGoogleSearch}
                className="flex items-center px-4 py-2 bg-fight-blue text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4 mr-2" />
                Search on Google
              </button>
            </div>
          </header>

          <section className="space-y-12">
            {fighters.map((fighter) => (
              <Fighter key={fighter.id} {...fighter} />
            ))}
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <p>&copy; {new Date().getFullYear()} MMA Legends. All rights reserved.</p>
            <div className="text-gray-400 hover:text-white transition-colors duration-300">
              <a 
                href="https://similar.casino/casino-type/sports-betting" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-fight-blue"
              >
                Top Betting sites
              </a>
              {' '}for MMA
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;