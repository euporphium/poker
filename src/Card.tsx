type CardProps = {
  card: any;
  onClick: () => void;
};

export default function Card({ card, onClick }: CardProps) {
  return (
    <img src={`/images/cards/${card.id}.png`} alt={card.id} onClick={onClick} />
  );
}
