import { useState } from 'react'
import './TodoCard.css'

function TodoCard({ todo, setTodos }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDesc, setEditDesc] = useState(todo.description)
  const [editPriority, setEditPriority] = useState(todo.priority)

  const handleToggle = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          completed: !todo.completed
        })
      })
      const updated = await response.json()
      setTodos(prev => prev.map(t => t.id === todo.id ? updated : t))
    } catch (err) {
      console.error('Failed to update todo:', err)
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/api/todos/${todo.id}`, {
        method: 'DELETE'
      })
      setTodos(prev => prev.filter(t => t.id !== todo.id))
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  const handleEdit = async () => {
    if (!editTitle.trim()) return
    try {
      const response = await fetch(`http://localhost:8080/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          description: editDesc,
          priority: editPriority,
          completed: todo.completed
        })
      })
      const updated = await response.json()
      setTodos(prev => prev.map(t => t.id === todo.id ? updated : t))
      setIsEditing(false)
    } catch (err) {
      console.error('Failed to edit todo:', err)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  if (isEditing) {
    return (
      <div className="todo-card editing">
        <div className="todo-body">
          <input
            className="edit-input"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="edit-textarea"
            value={editDesc}
            onChange={e => setEditDesc(e.target.value)}
            placeholder="Description (optional)"
          />
          <select
            className="edit-select"
            value={editPriority}
            onChange={e => setEditPriority(e.target.value)}
          >
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <div className="edit-actions">
            <button className="save-btn" onClick={handleEdit}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`todo-card ${todo.completed ? 'done' : ''}`}>
      <div
        className={`todo-check ${todo.completed ? 'checked' : ''}`}
        onClick={handleToggle}
      />
      <div className="todo-body">
        <div className="todo-title">{todo.title}</div>
        {todo.description && (
          <div className="todo-desc">{todo.description}</div>
        )}
        <div className="todo-meta">
          <span className={`badge badge-${todo.priority}`}>
            {todo.priority.charAt(0) + todo.priority.slice(1).toLowerCase()}
          </span>
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </div>
      </div>
      <div className="todo-actions">
        <button className="icon-btn edit" onClick={() => setIsEditing(true)}>✎</button>
        <button className="icon-btn del" onClick={handleDelete}>✕</button>
      </div>
    </div>
  )
}

export default TodoCard