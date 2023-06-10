import { usePokerDispatch } from '../usePoker.ts';

export default function Controls() {
  const dispatch = usePokerDispatch();

  return (
    <div className="controls">
      <button onClick={() => dispatch({ type: 'calculateOdds' })}>
        Calculate Odds
      </button>
    </div>
  );
}
