<script setup lang="ts">
import Categories from '../todo/categories-table.vue'
import TodoList from '../todo/todo-list.vue'
import { useTodoStore } from '@/stores/todo-store'
import { ref, computed } from 'vue'

const store = useTodoStore()
const expandedCategory = ref<number | null>(null)

const categories = computed(() => store.categories)

const toggleCategory = (categoryId: number) => {
    expandedCategory.value = expandedCategory.value === categoryId ? null : categoryId
}
</script>

<template>
    <div class="main-container">

        <div class="page-container">
            <div class="cat-container">
                <Categories />
            </div>

            <div class="tasks-container">
                <h2>What do you want to do today?</h2>

                <div v-if="categories.length" class="category-list">
                    <div v-for="category in categories" :key="category.id" class="category-item">
                        <div class="category-header" @click="toggleCategory(category.id)">
                            <h3>{{ category.name }}</h3>
                            <span v-if="expandedCategory === category.id">▲</span>
                            <span v-else>▼</span>
                        </div>

                        <transition name="slide">
                            <TodoList v-if="expandedCategory === category.id" :category="category" />
                        </transition>
                    </div>
                </div>

                <p v-else class="no-cat">No categories available.</p>
            </div>
        </div>

        <div class="link-container">
            <RouterLink to="/">Go back</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.page-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 900px;
}

.cat-container {
    flex: 1;
    margin-right: 20px;
    background-color: rgb(236, 243, 247);
    border-radius: 1rem;
    padding: 5px;
}

.tasks-container {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(236, 243, 247);
    border: none;
    padding: 30px;
    border-radius: 1rem;
    margin-top: 20px;
}

.link-container {
    text-align: center;
}

.category-list {
    width: 100%;
    max-width: 600px;
}

.category-item {
    border: 2px solid rgb(207, 222, 233);
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    transition: 0.3s;
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.no-cat {
    margin: 20px 0 0 0;
    color: rgb(144, 155, 168);
}

.slide-enter-active, .slide-leave-active {
    transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}

.slide-enter-from, .slide-leave-to {
    max-height: 0;
    opacity: 0;
}

.slide-enter-to, .slide-leave-from {
    max-height: 500px;
    opacity: 1;
}

span {
    color: rgb(184, 196, 206);
}

h3 {
    margin-left: 10px;
}
</style>
