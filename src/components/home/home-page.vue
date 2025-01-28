<script setup lang="ts">
import { RouterLink } from 'vue-router';
const Name = 'Frances Gail T. Quipit';
</script>

<template>
  <div class="center">
    <h2>{{ Name }}</h2>
    <br />
    1/16/2025
  </div>
  <div>
    <RouterLink :to="{ name: 'todo' }"> Go to app </RouterLink>
  </div>
</template>

<style>
.center {
  text-align: center;
}

.button {
  padding: 5px;
  background-color: rgb(204, 200, 210);
  border: none;
  border-radius: 5px;
  display: block;
  margin: 20px auto;
  text-align: center;
}
</style>
