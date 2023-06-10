import usePoker from '../usePoker.ts';
import PlayerCards from './PlayerCards.tsx';
import PlayerCountControl from './PlayerCountControl.tsx';

export function Players() {
  const poker = usePoker();

  return (
    <div>
      <PlayerCountControl />

      <ul className="player-container" role="list">
        {poker.players.map((player) => (
          <PlayerCards key={player.id} playerId={player.id} />
        ))}
      </ul>
    </div>
  );
}
