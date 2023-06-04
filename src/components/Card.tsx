import { Card } from '../cards.ts';

type CardProps = {
  card: Card;
  onClick: () => void;
};

export default function Card({ card, onClick }: CardProps) {
  return (
    <img
      className="card"
      src={`/images/cards/${card.id}.png`}
      alt={card.id}
      onClick={onClick}
    />
  );
}
