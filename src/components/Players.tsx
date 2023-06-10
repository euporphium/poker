import usePoker, { usePokerDispatch } from '../usePoker.ts';
import PlayerCards from './PlayerCards.tsx';

export function Players() {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  return (
    <div>
      <ul className="player-container" role="list">
        {poker.players.map((player) => (
          <PlayerCards key={player.id} playerId={player.id} />
        ))}
        <li className="player-container__add-player">
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
        </li>
      </ul>
    </div>
  );
}
