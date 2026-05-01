import { useEffect } from 'react'
import TodoCard from './TodoCard'
import './TodoList.css'

function TodoList({ todos, setTodos, filter }) {

  useEffect(() => {
    fetch('http://localhost:8080/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Failed to fetch todos:', err))
  }, [])

  const active = todos.filter(t => !t.completed)
  const done = todos.filter(t => t.completed)

  if (filter === 'completed') {
    return (
      <div className="todo-list">
        <div className="section-label">Completed — {done.length} done</div>
        {done.length ? done.map(t => (
          <TodoCard key={t.id} todo={t} setTodos={setTodos} />
        )) : <div className="empty">No completed todos yet</div>}
      </div>
    )
  }

  if (filter === 'active') {
    return (
      <div className="todo-list">
        <div className="section-label">Active — {active.length} remaining</div>
        {active.length ? active.map(t => (
          <TodoCard key={t.id} todo={t} setTodos={setTodos} />
        )) : <div className="empty">No active todos — all done!</div>}
      </div>
    )
  }

  return (
    <div>
      {active.length > 0 && (
        <div className="todo-list">
          <div className="section-label">Active — {active.length} remaining</div>
          {active.map(t => (
            <TodoCard key={t.id} todo={t} setTodos={setTodos} />
          ))}
        </div>
      )}
      {done.length > 0 && (
        <div className="todo-list" style={{ marginTop: '1rem' }}>
          <div className="section-label">Completed — {done.length} done</div>
          {done.map(t => (
            <TodoCard key={t.id} todo={t} setTodos={setTodos} />
          ))}
        </div>
      )}
      {todos.length === 0 && (
        <div className="empty">No todos found — add one above!</div>
      )}
    </div>
  )
}

export default TodoList