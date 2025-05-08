export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
      <li style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        <span onClick={onToggle} style={{ cursor: "pointer" }}>
          {todo.text}
        </span>
        <button onClick={onDelete}>❌</button>
      </li>
    );
  }
  