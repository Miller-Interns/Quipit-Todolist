<script setup lang="ts">
  import Categories from '../todo/categories-table.vue';
  import TodoList from '../todo/todo-list.vue';
  import { useEditModal } from '@/composables/use-modal';
  import { useConfirmModal } from '@/composables/use-warning';
  import { useTodo } from '@/composables/use-todo';
  import WarningIcon from '../icons/warning-icon.vue';

  const { categories, expandedCategory, toggleCategory } = useTodo();

  const {
    isConfirmOpen,
    message,
    openDeleteCategoryModal,
    openDeleteTodoModal,
    confirmAction,
    closeModal,
  } = useConfirmModal();

  const {
    isOpen: isEditOpen,
    newText,
    openCategoryModal,
    openTodoModal,
    closeModal: closeEditModal,
    saveChanges,
  } = useEditModal();
</script>

<template>
  <div class="main-container">
    <div class="page-container">
      <div class="cat-container">
        <Categories
          :openCategoryModal="openCategoryModal"
          :openConfirmModal="openDeleteCategoryModal"
        />
      </div>
      <div class="tasks-container">
        <h2>What do you want to do today?</h2>
        <div v-if="categories.length" class="category-list">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-item"
          >
            <div class="category-header" @click="toggleCategory(category.id)">
              <h3>{{ category.name }}</h3>
              <span v-if="expandedCategory === category.id">˄</span>
              <span v-else>˅</span>
            </div>
            <transition name="slide">
              <TodoList
                v-if="expandedCategory === category.id"
                :category="category"
                :openTodoModal="openTodoModal"
                :openConfirmModal="openDeleteTodoModal"
              />
            </transition>
          </div>
        </div>
        <p v-else class="no-cat">No categories available.</p>
      </div>
    </div>
    <transition name="fade" appear>
      <div v-if="isEditOpen" class="modal-container">
        <div class="modal-content">
          <h3>Edit {{ expandedCategory ? 'Task' : 'Category' }}</h3>
          <input v-model="newText" class="edit-input" maxlength="20" />
          <div class="modal-actions">
            <button @click="saveChanges" class="save-btn">Save</button>
            <button @click="closeEditModal" class="close-btn">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" appear>
      <div v-if="isConfirmOpen" class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <WarningIcon />
            <h3>Confirm Action</h3>
          </div>
          <p>{{ message }}</p>
          <div class="modal-actions">
            <button @click="confirmAction" class="confirm-btn">Confirm</button>
            <button @click="closeModal" class="close-btn">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .main-container {
    width: 100%;
    max-width: 900px;
    position: relative;
    z-index: 1;
  }

  .cat-container,
  .tasks-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: rgb(236, 243, 247);
    border-radius: 1rem;
    min-height: 200px;
  }

  .tasks-container {
    padding: 30px;
  }

  .cat-container {
    margin-right: 20px;
    padding: 3px;
  }

  .tasks-container {
    flex: 2;
  }

  .link-container {
    text-align: center;
  }

  .category-list {
    width: 100%;
    max-width: 600px;
  }

  .category-item {
    border: 2px solid rgb(207, 222, 233);
    margin: 10px 0;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    transition: 0.3s;
  }

  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .no-cat {
    margin: 20px 0 0 0;
    color: rgb(144, 155, 168);
    text-align: center;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition:
      max-height 0.3s ease-out,
      opacity 0.3s ease-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .slide-enter-to,
  .slide-leave-from {
    max-height: 500px;
    opacity: 1;
  }

  span {
    color: rgb(184, 196, 206);
    font-weight: bold;
    font-size: 1.5rem;
  }

  h3 {
    margin-left: 10px;
  }

  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .edit-input {
    width: 95%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgb(184, 196, 206);
    margin-bottom: 10px;
  }

  .edit-input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgb(159, 212, 186);
    transition: ease-in-out 0.2s;
  }

  .modal-actions {
    margin: 20px 5px 5px 5px;
    display: flex;
    justify-content: flex-end;
  }

  .modal-content h3 {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  .save-btn {
    background-color: hsl(160, 100%, 37%);
    border-radius: 9px;
    border: none;
    padding: 7px;
    color: white;
    cursor: pointer;
  }

  .confirm-btn {
    background-color: rgb(207, 53, 63);
    border-radius: 9px;
    border: none;
    padding: 7px;
    color: white;
    cursor: pointer;
  }

  .confirm-btn:hover {
    background-color: rgb(180, 46, 55);
  }

  .close-btn {
    background-color: rgb(184, 196, 206);
    border-radius: 9px;
    border: none;
    padding: 7px;
    color: rgb(76, 87, 98);
    margin-left: 5px;
    cursor: pointer;
  }

  .close-btn:hover {
    background-color: rgb(160, 174, 185);
  }

  .save-btn:hover {
    background-color: hsl(160, 100%, 30%);
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 90%;
    text-align: center;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
