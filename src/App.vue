<template>
  <div id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        v-model="state.newTodo"
        placeholder="What needs to be done?"
        class="new-todo"
        @keyup.enter="handleAddTodo"
      />
    </header>
    <section
      v-if="state.todos.length"
      class="main"
    >
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all">
        Mark all as complete
      </label>
      <ul class="todo-list">
        <TodoItem
          v-for="t in filteredTodos"
          :key="t.id"
          :title="t.title"
          :completed="t.completed"
          @toggle="handleToggleTodo(t)"
          @destroy="handleDestroyTodo(t)"
          @save="e => handleSaveEditTodo(t, e)"
        />
      </ul>
    </section>
    <Footer
      :activeCount="activeCount"
      :completedCount="completedCount"
      :currentView="state.currentView"
      @clearCompleted="handleClearCompleted"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, watch } from '@vue/composition-api'
import TodoItem from './components/TodoItem.vue'
import Footer from './components/Footer.vue'

import { todoStorage } from './todoStorage'
import { VIEW_TYPES } from './constants'

export default defineComponent({
  name: 'App',
  components: {
    TodoItem,
    Footer,
  },
  setup() {
    const state: {
      newTodo: string
      todos: ITodo[]
      currentView: VIEW_TYPES
    } = reactive({
      newTodo: '',
      todos: todoStorage.fetch(),
      currentView: VIEW_TYPES.all,
    })

    const handleAddTodo = () => {
      if (!state.newTodo) {
        return
      }

      state.todos.push({
        id: todoStorage.uid++,
        title: state.newTodo,
        completed: false,
      })

      state.newTodo = ''
    }

    const handleToggleTodo = (todoToToggle: ITodo) => {
      todoToToggle.completed = !todoToToggle.completed
    }

    const handleDestroyTodo = (todoToDestroy: ITodo) => {
      state.todos.splice(state.todos.indexOf(todoToDestroy), 1)
    }

    const handleSaveEditTodo = (todoToModify: ITodo, v: string) => {
      todoToModify.title = v
    }

    const handleClearCompleted = () => {
      state.todos = state.todos.filter(t => !t.completed)
    }

    const activeCount = computed(() => state.todos.filter(t => !t.completed).length)
    const completedCount = computed(() => state.todos.length - activeCount.value)

    const filteredTodos = computed(() => {
      const { currentView, todos } = state

      if (currentView === VIEW_TYPES.all) {
        return todos
      }

      return todos.filter(t => currentView === VIEW_TYPES.completed
        ? t.completed
        : !t.completed
      )
    })

    const allDone = computed({
      get: () => !activeCount.value,
      set: (v: boolean) => {
        state.todos.forEach(t => t.completed = v)
      },
    })

    watch(
      () => state.todos,
      () => {
        todoStorage.save(state.todos)
      },
      {
        deep: true,
      },
    )

    const onHashChange = () => {
      var currentView = window.location.hash.replace(/#\/?/, '')

      if (currentView in VIEW_TYPES) {
        state.currentView = currentView as VIEW_TYPES
      } else {
        window.location.hash = ''
      }
    }
    onHashChange()

    // Add hashchange event listener after mounted
    onMounted(() => window.addEventListener('hashchange', onHashChange))

    // Remove event listener before unmount
    onBeforeUnmount(() => window.removeEventListener('hashchange', onHashChange))

    return {
      state,
      allDone,
      activeCount,
      filteredTodos,
      completedCount,
      handleAddTodo,
      handleToggleTodo,
      handleDestroyTodo,
      handleSaveEditTodo,
      handleClearCompleted,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
