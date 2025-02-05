import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/stores/todo-store';

export function useCategory() {
  const store = useTodoStore();
  const { categories } = storeToRefs(store);

  const addCategory = (name: string) => {
    if (!name.trim()) return;
    store.addCategory(name.trim());
    store.successMessage('Category added successfully');
  };

  const editCategory = (id: number, newName: string) => {
    if (!newName.trim()) return;
    store.editCategory(id, newName.trim());
    store.successMessage('Category edited successfully');
  };

  return {
    categories,
    addCategory,
    editCategory,
  };
}
