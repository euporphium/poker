import Card from '../Card.tsx';
import usePoker, { usePokerDispatch } from '../usePoker.ts';
import { cards } from '../cards.ts';

export default function Deck() {
  const poker = usePoker();
  const dispatch = usePokerDispatch();

  return (
    <div className="card-container">
      {cards
        .filter((card) => poker.availableCards.indexOf(card) !== -1)
        .map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => dispatch({ type: 'assignCard', payload: card })}
          />
        ))}
    </div>
  );
}
