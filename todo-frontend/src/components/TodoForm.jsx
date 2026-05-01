import { useState } from 'react'
import './TodoForm.css'
import { createTodo } from '../services/todoService'; 

function TodoForm({ setTodos }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('MEDIUM')
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const newTodo = await createTodo({
        title: title.trim(),
        description: description.trim(),
        priority,
        completed: false
      });
      setTodos(prev => [newTodo, ...prev]);
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
    } catch (err) {
      console.error('Failed to add todo:', err);
      alert(`Error: ${err.message}`);  // now you'll see the real problem
    }
    setLoading(false);
  };

  return (
    <div className="todo-form">
      <h2>+ New Todo</h2>
      <div className="form-row">
        <input
          type="text"
          placeholder="Title — what needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>
      <div className="form-row">
        <textarea
          placeholder="Description — add more details (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button
        className="add-btn"
        onClick={handleAdd}
        disabled={loading || !title.trim()}
      >
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </div>
  )
}

export default TodoForm