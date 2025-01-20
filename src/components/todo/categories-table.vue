<script setup lang="ts">
import { useTodo } from '@/composables/use-categories'
import { ref, computed, watch } from 'vue'
import PlusIcon from '../icons/plus-icon.vue';
import PencilIcon from '../icons/pencil-icon.vue';
import TrashIcon from '../icons/trash-icon.vue';

const { addCategory, editCategory, removeCategory } = useTodo()
const newCategory = ref('')
const categories = computed(() => useTodo().store.categories)

watch(newCategory, (newValue) => {
    if (newValue.length > 20) {
        newCategory.value = newValue.substring(0, 20)
    }
})

const createCategory = () => {
    if (newCategory.value.trim() && newCategory.value.length <= 20) {
        addCategory(newCategory.value)
        newCategory.value = ''
    }
}

const updateCategory = (id: number) => {
    const newName = prompt("Enter new category name:")
    if (newName) editCategory(id, newName)
}
</script>

<template>
    <div class="cat-container">
        <div class="add-cat-container">
            <input 
            v-model="newCategory"
            placeholder="Enter a new category name"
            class="add-cat"
            maxlength="20"
            @keyup.enter="createCategory" />
            <div @click="createCategory" class="btn">
                <PlusIcon />
            </div>
        </div>

        <ul>
            <li v-for="category in categories" :key="category.id">
                {{ category.name }}
                <div class="actions-group">
                    <button @click="updateCategory(category.id)" class="actions-btn">
                        <PencilIcon />
                    </button>
                    <button @click="removeCategory(category.id)" class="actions-btn">
                        <TrashIcon />
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .cat-container{
        border: none;
        margin: 20px;
    }

    .add-cat {
        border: none;
        border-radius: 5px;
        margin: 5px;
        font-family: 'Inter', sans-serif;
        padding: 10px;
    }

    .add-cat:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgb(159, 212, 186);
        transition: ease-in-out 0.2s;
    }

    .btn {
        background-color: none;
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
    }

    li {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
    }

    .actions-group {
        display: flex;
        gap: 6px;
    }

    .actions-btn {
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .add-cat-container {
        display: flex;
        align-items: center;
    }

</style>
