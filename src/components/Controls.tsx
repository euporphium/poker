import { usePokerDispatch } from '../usePoker.ts';

export default function Controls() {
  const dispatch = usePokerDispatch();

  return (
    <div id="controls">
      <button onClick={() => dispatch({ type: 'calculateOdds' })}>
        Calculate Odds
      </button>
    </div>
  );
}
