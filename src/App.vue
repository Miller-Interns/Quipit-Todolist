<script setup lang="ts">
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo-store'
import SuccessMessage from '@/components/messages/success-message.vue'

const store = useTodoStore()

onMounted(() => {
    store.loadFromLocalStorage()
})
</script>

<template>
    <SuccessMessage />
    <router-view />
</template>
