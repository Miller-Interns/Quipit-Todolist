import { ref } from 'vue';
import { useTodoStore } from '@/stores/todo-store';

export function useConfirmModal() {
  const store = useTodoStore();
  const isConfirmOpen = ref(false);
  const message = ref('');
  const categoryId = ref<number | null>(null);
  const todoId = ref<number | null>(null);

  const resetModal = () => {
    isConfirmOpen.value = false;
    message.value = '';
    categoryId.value = null;
    todoId.value = null;
  };

  const openDeleteCategoryModal = (catId: number) => {
    categoryId.value = catId;
    todoId.value = null;
    message.value = 'Are you sure you want to delete this category?';
    isConfirmOpen.value = true;
  };

  const openDeleteTodoModal = (catId: number, tId: number) => {
    categoryId.value = catId;
    todoId.value = tId;
    message.value = 'Are you sure you want to delete this task?';
    isConfirmOpen.value = true;
  };

  const confirmAction = () => {
    if (categoryId.value !== null && todoId.value === null) {
      store.removeCategory(categoryId.value);
      store.successMessage('Category removed successfully');
    } else if (categoryId.value !== null && todoId.value !== null) {
      store.removeTodo(categoryId.value, todoId.value);
      store.successMessage('Task removed successfully');
    }
    resetModal();
  };

  return {
    isConfirmOpen,
    message,
    openDeleteCategoryModal,
    openDeleteTodoModal,
    confirmAction,
    closeModal: resetModal,
  };
}
