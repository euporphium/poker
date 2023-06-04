import usePoker, { usePokerDispatch } from '../usePoker.ts';
import Card from '../Card.tsx';

export default function CommunityCards() {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  return (
    <div className="card-container">
      <h2 className={poker.cardTarget === 'Table' ? 'selected' : ''}>
        <span
          onClick={() => dispatch({ type: 'setCardTarget', payload: 'Table' })}
        >
          Table
        </span>
      </h2>
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
  );
}
