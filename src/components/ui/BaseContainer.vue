<script setup lang="ts">
import ModalNotification from "../../components/modal/ModalNotification.vue";
</script>

<template>
  <div class="container">
    <slot></slot>
    <ModalNotification />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  padding: 20px;
  max-width: 1280px;
  margin: auto;
}
</style>
