import PokerProvider from './PokerContext.tsx';
import Deck from './components/Deck.tsx';
import CommunityCards from './components/CommunityCards.tsx';
import Controls from './components/Controls.tsx';
import PlayerCards from './components/PlayerCards.tsx';
import usePoker from './usePoker.ts';
import './App.css';

function App() {
  return (
    <PokerProvider>
      <Deck />
      <CommunityCards />
      <Players />
      <Controls />
    </PokerProvider>
  );
}

export default App;

function Players() {
  const poker = usePoker();

  return (
    <>
      {poker.players.map((player) => (
        <PlayerCards key={player.id} playerId={player.id} />
      ))}
    </>
  );
}
