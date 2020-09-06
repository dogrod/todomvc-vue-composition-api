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
  </footer>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

import { VIEW_TYPES } from '../constants'

export default defineComponent({
  name: 'Footer',
  props: {
    activeCount: Number,
    completedCount: Number,
    currentView: String,
  },
  setup(props) {
    const activeTodoWord = props.activeCount && props.activeCount > 1
      ? 'items'
      : 'item'

    return {
      activeTodoWord,
      viewTypes: reactive(VIEW_TYPES),
    }
  },
})
</script>

<style>
</style>
