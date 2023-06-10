import usePoker, { usePokerDispatch } from '../usePoker.ts';
import Card from './Card.tsx';

export default function CommunityCards() {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  return (
    <div
      id="community-cards"
      className={`table-card-container community ${
        poker.cardTarget === 'Table' ? 'selected' : ''
      }`}
    >
      <h2 onClick={() => dispatch({ type: 'setCardTarget', payload: 'Table' })}>
        Community Cards
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
