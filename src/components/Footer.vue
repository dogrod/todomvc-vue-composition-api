<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ activeCount }} {{ activeTodoWord }} left</strong>
    </span>
    <ul class="filters">
      <li v-for="t in viewTypes" :key="t">
        <a
          :href="`#/${t}`"
          :class="{ selected: currentView == t }"
        >
          {{ t }}
        </a>
      </li>
    </ul>
    <button
      class="clear-completed"
      v-show="completedCount"
      @click="handleClearCompleted"
    >
      Clear completed
    </button>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'

import { VIEW_TYPES } from '../constants'

export default defineComponent({
  name: 'Footer',
  props: {
    activeCount: Number,
    completedCount: Number,
    currentView: String,
  },
  setup(props, { emit }) {
    const activeTodoWord = computed(() => props.activeCount && props.activeCount > 1
      ? 'items'
      : 'item'
    )

    const handleClearCompleted = () => emit('clearCompleted')

    return {
      activeTodoWord,
      viewTypes: reactive(VIEW_TYPES),
      handleClearCompleted,
    }
  },
})
</script>

<style>
</style>
