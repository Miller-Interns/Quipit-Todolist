<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useTodo } from '@/composables/use-categories'
import type { Category } from '@/types/Category'
import PlusIcon from '../icons/plus-icon.vue'
import TrashIcon from '../icons/trash-icon.vue'
import PencilIcon from '../icons/pencil-icon.vue'

const props = defineProps<{ category: Category }>()
const newTodo = ref('')
const { addTodo, editTodo, toggleTodo, removeTodo } = useTodo()

watch(newTodo, (newValue) => {
    if (newValue.length > 20) {
        newTodo.value = newValue.substring(0, 20)
    }
})

const createTodo = () => {
    if (newTodo.value.trim() && newTodo.value.length <= 20) {
        addTodo(props.category.id, newTodo.value)
        newTodo.value = ''
    }
}

const updateTodo = (todoId: number) => {
    let newText = prompt("Edit new task name:", "")
    if (newText) {
        newText = newText.substring(0, 20)
        editTodo(props.category.id, todoId, newText)
    }
}
</script>

<template>
    <div class="todo-container">
        <div class="input-group">
            <input 
                v-model="newTodo" 
                placeholder="Add new task" 
                class="add-todo" 
                maxlength="20"
                @keyup.enter="createTodo"
            />
            <button @click="createTodo" class="btn">
                <PlusIcon />
            </button>
        </div>

        <ul v-if="category && category.todos.length">
            <li v-for="todo in category.todos" :key="todo.id" class="todo-item">
                <label class="todo-label">
                    <input type="checkbox" :checked="todo.completed" @change="toggleTodo(category.id, todo.id)" class="checkbox" />
                    <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
                </label>
                <div class="actions-group">
                    <button @click="updateTodo(todo.id)" class="actions-btn">
                        <PencilIcon />
                    </button>
                    <button @click="removeTodo(category.id, todo.id)" class="actions-btn">
                        <TrashIcon />
                    </button>
                </div>
            </li>
        </ul>
        <p v-else class="no-tasks">No tasks yet.</p>
    </div>
</template>

<style scoped>
    .todo-container {
        margin: 10px 20px 10px 20px;
    }

    .input-group {
        display: flex;
        align-items: center;
    }

    .add-todo {
        border: 2px solid rgb(217, 227, 233);
        border-radius: 5px;
        margin: 5px;
        font-family: 'Inter', sans-serif;
        padding: 10px;
        flex-grow: 1;
    }

    .add-todo:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgb(159, 212, 186);
        border: 2px solid rgb(159, 212, 186);
        transition: ease-in-out 0.2s;
    }

    .checkbox {
        margin-right: 10px;
        width: 15px;
        height: 15px;
        accent-color: rgb(190, 202, 210);
    }

    .btn {
        background: none;
        cursor: pointer;
        border: none;
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin-left: 10px;
        margin-top: 10px;
    }

    .todo-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
    }

    .todo-label {
        display: flex;
        align-items: center;
        flex-grow: 1;
        background-color: rgb(242, 244, 245);
        padding: 10px;
        border-radius: 5px;
    }

    .completed {
        color: #919293;
        text-decoration: line-through;
        
    }

    .actions-group {
        display: flex;
        gap: 6px;
        margin-left: 10px;
    }

    .actions-btn {
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .no-tasks {
        color: rgb(144, 155, 168);
        text-align: center;
        margin: 20px;
    }

</style>
