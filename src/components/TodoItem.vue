<template>
  <li class="todo" :class="{ completed: completed }">
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        :checked="completed"
        @change="handleToggle"
      />
      <label>
        {{ title }}
      </label>
      <button class="destroy" @click="handleClickDestroy"/>
    </div>
    <input type="text" class="edit" :value="title" />
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TodoItem',
  props: {
    title: String,
    completed: Boolean,
  },
  setup(_props, { emit }) {
    const handleToggle = () => emit('toggle')

    const handleClickDestroy = () => emit('destroy')

    return {
      handleToggle,
      handleClickDestroy,
    }
  },
})
</script>

<style>
</style>
