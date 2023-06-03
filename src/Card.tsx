export default function Card({ card, disabled, onClick }: any) {
  return (
    <img
      src={`/images/cards/${card.id}.png`}
      alt={card.id}
      className={disabled ? 'disabled' : ''}
      onClick={disabled ? null : onClick}
    />
  );
}
