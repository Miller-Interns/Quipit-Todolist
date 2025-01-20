<script setup lang="ts">
import { useTodoStore } from '@/stores/todo-store'

const store = useTodoStore()
</script>

<template>
    <transition name="fade">
        <div v-if="store.showMessage" class="success-message">
            {{ store.message }}
        </div>
    </transition>
</template>

<style scoped>
.success-message {
    position: fixed;
    bottom: 30px;
    left: 85%;
    transform: translateX(-50%);
    background-color: #d4edda;
    color: #155724;
    padding: 12px 20px;
    border-radius: 5px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    opacity: 1;
    transition: opacity 0.8s ease-in-out, transform 0.5s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(1px);
}

.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>
