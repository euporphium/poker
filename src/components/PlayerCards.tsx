import usePoker, { usePokerDispatch } from '../usePoker.ts';
import Card from './Card.tsx';

export default function PlayerCards({ playerId }: { playerId: string }) {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  const player = poker.players.find((player) => player.id === playerId);

  if (!player) throw new Error('Player not found');

  return (
    <div className="table-card-container">
      <h2 className={poker.cardTarget === playerId ? 'selected' : ''}>
        <span
          onClick={() => dispatch({ type: 'setCardTarget', payload: playerId })}
        >
          {playerId}
        </span>
        {player.odds && <span> {player.odds}</span>}
      </h2>
      <div className="card-container">
        {player.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => {
              // Only allow removing cards from the selected player
              if (poker.cardTarget !== playerId) return;

              dispatch({ type: 'removeCard', payload: card });
            }}
          />
        ))}
      </div>
    </div>
  );
}
