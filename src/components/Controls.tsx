import usePoker, { usePokerDispatch } from '../usePoker.ts';

export default function Controls() {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  return (
    <div>
      <h1>Poker Odds Calculator</h1>

      {poker.players.length < 9 && (
        <button onClick={() => dispatch({ type: 'addPlayer' })}>
          Add Player
        </button>
      )}

      {poker.players.length > 2 && (
        <button onClick={() => dispatch({ type: 'removePlayer' })}>
          Remove Player
        </button>
      )}

      <button onClick={() => dispatch({ type: 'calculateOdds' })}>
        Calculate Odds
      </button>
    </div>
  );
}
