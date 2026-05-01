import { useState, useEffect } from 'react'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  const filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    if (filter === 'HIGH') return todo.priority === 'HIGH'
    if (filter === 'MEDIUM') return todo.priority === 'MEDIUM'
    if (filter === 'LOW') return todo.priority === 'LOW'
    return true
  })

  const totalDone = todos.filter(t => t.completed).length
  const pct = todos.length ? Math.round((totalDone / todos.length) * 100) : 0

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <Header
          total={todos.length}
          completed={totalDone}
          pending={todos.length - totalDone}
          percentage={pct}
        />
        <TodoForm setTodos={setTodos} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TodoList
          todos={filtered}
          setTodos={setTodos}
          filter={filter}
        />
      </div>
    </div>
  )
}

export default App