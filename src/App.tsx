import PokerProvider from './PokerContext.tsx';
import Deck from './components/Deck.tsx';
import './App.css';
import { Players } from './components/Players.tsx';
import CommunityCards from './components/CommunityCards.tsx';
import Controls from './components/Controls.tsx';

function App() {
  return (
    <PokerProvider>
      <div className="layout">
        <h1>Poker Odds Calculator</h1>
        <p>
          Select containers to assign player and community cards to calculate
          each player's odds of winning.
        </p>

        <Players />
        <CommunityCards />

        <Deck />
        <Controls />
      </div>
    </PokerProvider>
  );
}

export default App;
