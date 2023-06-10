import usePoker, { usePokerDispatch } from '../usePoker.ts';
import Card from './Card.tsx';

export default function PlayerCards({ playerId }: { playerId: string }) {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  const player = poker.players.find((player) => player.id === playerId);

  if (!player) throw new Error('Player not found');

  return (
    <li
      className={`table-card-container ${
        poker.cardTarget === playerId ? 'selected' : ''
      }`}
    >
      <h2
        onClick={() => dispatch({ type: 'setCardTarget', payload: playerId })}
      >
        {playerId}
        {player.odds && <span> - {player.odds}</span>}
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
    </li>
  );
}
