export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
    return (
        <div style={{ flex: 1, marginBottom: 10 }}>
            <span style={{ fontWeight: "bold" }}>#{todo.id}</span> {todo.text}
        </div>
    );
};
