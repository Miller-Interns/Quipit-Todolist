import { defineStore } from 'pinia'
import type { Category } from '@/types/Category'

export const useTodoStore = defineStore('todos', {
    state: () => ({
        categories: [] as Category[],
        message: '',
        showMessage: false,
    }),

    actions: {
        loadFromLocalStorage() {
            const categories = localStorage.getItem('todo-categories')
            if (categories) {
                this.categories = JSON.parse(categories)
            }
        },

        saveToLocalStorage() {
            localStorage.setItem('todo-categories', JSON.stringify(this.categories))
        },

        displayMessage(msg: string) {
            this.message = msg
            this.showMessage = true
            setTimeout(() => {
                this.showMessage = false
            }, 3000)
        },

        addCategory(name: string) {
            this.categories.push({
                id: Date.now(),
                name,
                todos: [],
            })
            this.saveToLocalStorage()
            this.displayMessage('Category added successfully')
        },

        editCategory(id: number, newName: string) {
            const category = this.categories.find(category => category.id === id)
            if (category) {
                category.name = newName
                this.saveToLocalStorage()
                this.displayMessage('Category edited successfully')
            }
        },

        removeCategory(id: number) {
            this.categories = this.categories.filter(category => category.id !== id)
            this.saveToLocalStorage()
            this.displayMessage('Category removed successfully')
        },

        addTodo(categoryId: number, text: string) {
            const category = this.categories.find(category => category.id === categoryId)
            if (category) {
                category.todos.push({
                    id: Date.now(),
                    text,
                    completed: false,
                })
                this.saveToLocalStorage()
                this.displayMessage('Task added successfully')
            }
        },

        editTodo(categoryId: number, id: number, newText: string) {
            const category = this.categories.find(category => category.id === categoryId)
            if (category) {
                const todo = category.todos.find(todo => todo.id === id)
                if (todo) {
                    todo.text = newText
                    this.saveToLocalStorage()
                    this.displayMessage('Task edited successfully')
                }
            }
        },

        toggleTodo(categoryId: number, id: number) {
            const category = this.categories.find(category => category.id === categoryId)
            if (category) {
                const todo = category.todos.find(todo => todo.id === id)
                if (todo) {
                    todo.completed = !todo.completed
                    this.saveToLocalStorage()
                }
            }
        },

        removeTodo(categoryId: number, id: number) {
            const category = this.categories.find(category => category.id === categoryId)
            if (category) {
                category.todos = category.todos.filter(todo => todo.id !== id)
                this.saveToLocalStorage()
                this.displayMessage('Task removed successfully')
            }
        }
    },
})
