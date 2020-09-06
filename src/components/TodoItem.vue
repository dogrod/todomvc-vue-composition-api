<template>
  <li class="todo" :class="{ completed: completed, editing: state.editing }">
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        :checked="completed"
        @change="handleToggle"
      />
      <label @dblclick="handleEdit">
        {{ title }}
      </label>
      <button class="destroy" @click="handleClickDestroy"/>
    </div>
    <input
      class="edit"
      type="text"
      v-model="state.editText"
      v-todo-focus="state.editing"
      @blur="handleSubmitEdit"
      @keyup.enter="handleSubmitEdit"
      @keyup.esc="handleCancelEdit"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'TodoItem',
  props: {
    title: String,
    completed: Boolean,
  },
  directives: {
    'todo-focus': (el, binding) => {
      if (binding.value) {
        el.focus()
      }
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      editText: props.title,
      editing: false,
    })

    const handleToggle = () => emit('toggle')

    const handleEdit = () => {
      state.editing = true
    }

    const handleSubmitEdit = () => {
      const val = state.editText?.trim()

      if (val) {
        emit('save', val)
      } else {
        emit('destroy')
      }

      state.editing = false
    }

    const handleCancelEdit = () => {
      state.editing = false
      state.editText = props.title
    }

    const handleClickDestroy = () => emit('destroy')

    return {
      state,
      handleToggle,
      handleEdit,
      handleCancelEdit,
      handleSubmitEdit,
      handleClickDestroy,
    }
  },
})
</script>

<style>
</style>
