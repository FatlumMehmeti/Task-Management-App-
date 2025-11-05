import "./BoardCard.css";

type BoardCardProps = {
  title: string;
  background?: string;
};

export default function BoardCard({ title, background }: BoardCardProps) {
  return (
    <div
      className="board-card"
      style={{ background: background }} // fallback gray
    >
      <div className="board-card-title">{title}</div>
    </div>
  );
}
