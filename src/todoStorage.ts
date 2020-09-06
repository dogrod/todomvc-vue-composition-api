const STORAGE_KEY = 'todos-vue-composition-api'

export const todoStorage = {
  uid: 0,
  fetch() {
    var todos: ITodo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save(todos: ITodo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
}
