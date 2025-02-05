import { useTodoStore } from '@/stores/todo-store';
import { storeToRefs } from 'pinia';

export function useMessage() {
  const store = useTodoStore();
  const { message, showMessage } = storeToRefs(store);

  const successMessage = (msg: string) => {
    store.successMessage(msg);
  };

  return {
    message,
    showMessage,
    successMessage,
  };
}
