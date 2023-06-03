export default function Card({ card, disabled, onClick }: any) {
  return (
    <div className={disabled ? 'disabled' : ''} onClick={onClick}>
      {card.id}
    </div>
  );
}
