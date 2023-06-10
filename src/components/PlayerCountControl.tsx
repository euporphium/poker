import usePoker, { usePokerDispatch } from '../usePoker.ts';

export default function PlayerCountControl() {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  return (
    <div className="players-control">
      <div className="players-control__buttons">
        <button
          onClick={() => dispatch({ type: 'addPlayer' })}
          disabled={poker.players.length >= 9}
        >
          &#8679;
        </button>
        <button
          onClick={() => dispatch({ type: 'removePlayer' })}
          disabled={poker.players.length <= 2}
        >
          &#8681;
        </button>
      </div>

      <p className="players-control__player-count">
        {poker.players.length} Players
      </p>
    </div>
  );
}
