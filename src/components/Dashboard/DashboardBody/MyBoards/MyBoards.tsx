import "./MyBoards.css";
import BoardCard from "../BoardCard/BoardCard";

type Board = {
  id: number;
  title: string;
  background: string;
};

const mockBoards: Board[] = [
  { id: 1, title: "My Trello board", background: "#cbc63bff" },
  { id: 2, title: "Tester", background: "#254489ff" },
  { id: 3, title: "Another Board", background: "#911687ff" },
];

export default function MyBoards() {
  return (
    <section className="my-boards">
      <div className="my-boards-header">
        <h2>Your Boards</h2>
      </div>

      <div className="my-boards-cards">
        {mockBoards.map((board) => (
          <BoardCard
            key={board.id}
            title={board.title}
            background={board.background}
          />
        ))}
        <button className="create-board-btn">Create new board</button>
      </div>
    </section>
  );
}
