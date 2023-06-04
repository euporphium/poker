import usePoker, { usePokerDispatch } from '../usePoker.ts';
import Card from './Card.tsx';

export default function CommunityCards() {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  return (
    <div className="table-card-container">
      <h2 className={poker.cardTarget === 'Table' ? 'selected' : ''}>
        <span
          onClick={() => dispatch({ type: 'setCardTarget', payload: 'Table' })}
        >
          Community Cards
        </span>
      </h2>
      <div className="card-container">
        {poker.tableCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => {
              // Only allow removing cards from the selected player
              if (poker.cardTarget !== 'Table') return;

              dispatch({ type: 'removeCard', payload: card });
            }}
          />
        ))}
      </div>
    </div>
  );
}
