import { ref } from 'vue';
import { useTodoStore } from '@/stores/todo-store';

export function useEditModal() {
  const store = useTodoStore();

  const isOpen = ref(false);
  const categoryId = ref<number | null>(null);
  const todoId = ref<number | null>(null);
  const newText = ref('');

  const openCategoryModal = (id: number, name: string) => {
    categoryId.value = id;
    todoId.value = null;
    newText.value = name;
    isOpen.value = true;
  };

  const openTodoModal = (catId: number, id: number, text: string) => {
    categoryId.value = catId;
    todoId.value = id;
    newText.value = text;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    categoryId.value = null;
    todoId.value = null;
    newText.value = '';
  };

  const saveChanges = () => {
    if (categoryId.value !== null && todoId.value === null) {
      store.editCategory(categoryId.value, newText.value);
    } else if (categoryId.value !== null && todoId.value !== null) {
      store.editTodo(categoryId.value, todoId.value, newText.value);
    }
    closeModal();
  };

  return {
    isOpen,
    newText,
    openCategoryModal,
    openTodoModal,
    closeModal,
    saveChanges,
  };
}
