import { computed, ref } from 'vue';
import { useTodoStore } from '@/stores/todo-store';

export function useTodo() {
  const store = useTodoStore();
  const expandedCategory = ref<number | null>(null);

  const categories = computed(() => store.categories);

  const addTodo = (categoryId: number, text: string) => {
    if (!text.trim()) return;
    store.addTodo(categoryId, text);
    store.successMessage('Task added successfully');
  };

  const toggleDone = (categoryId: number, id: number) => {
    store.toggleDone(categoryId, id);
  };

  const toggleCategory = (categoryId: number) => {
    expandedCategory.value =
      expandedCategory.value === categoryId ? null : categoryId;
  };

  return {
    categories,
    expandedCategory,
    toggleCategory,
    addTodo,
    toggleDone,
  };
}
