import type { TodoItem } from './TodoItem';

export type Category = {
  id: number;
  name: string;
  todos: TodoItem[];
};
