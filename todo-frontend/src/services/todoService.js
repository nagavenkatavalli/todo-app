const BASE_URL = 'http://localhost:8080/api/todos';

const handleResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
};

export const getAllTodos = () => fetch(BASE_URL).then(handleResponse);
export const createTodo = (todo) =>
  fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  }).then(handleResponse);
export const updateTodo = (id, todo) =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  }).then(handleResponse);
export const deleteTodo = (id) =>
  fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(handleResponse);