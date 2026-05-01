import './FilterBar.css'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'HIGH', label: 'High priority' },
  { key: 'MEDIUM', label: 'Medium priority' },
  { key: 'LOW', label: 'Low priority' },
]

function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      {filters.map(f => (
        <button
          key={f.key}
          className={`filter-btn ${filter === f.key ? 'active' : ''}`}
          onClick={() => setFilter(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

export default FilterBar    