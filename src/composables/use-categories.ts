import { useTodoStore } from '@/stores/todo-store'

export function useTodo() {
    const store = useTodoStore()

    const addCategory = (name: string) => {
        store.addCategory(name)
        store.displayMessage('Category added successfully')
    }

    const editCategory = (id: number, newName: string) => {
        store.editCategory(id, newName)
        store.displayMessage('Category edited successfully')
    }

    const removeCategory = (id: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            store.removeCategory(id)
            store.displayMessage('Category removed successfully')
        }
    }

    const addTodo = (categoryId: number, text: string) => {
        store.addTodo(categoryId, text)
        store.displayMessage('Task added successfully')
    }

    const editTodo = (categoryId: number, id: number, newText: string) => {
        store.editTodo(categoryId, id, newText)
        store.displayMessage('Task edited successfully')
    }

    const toggleTodo = (categoryId: number, id: number) => {
        store.toggleTodo(categoryId, id)
    }

    const removeTodo = (categoryId: number, id: number) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            store.removeTodo(categoryId, id)
            store.displayMessage('Task removed successfully')
        }
    }

    return {
        store,
        addCategory,
        editCategory,
        removeCategory,
        addTodo,
        editTodo,
        toggleTodo,
        removeTodo,
    }
}
