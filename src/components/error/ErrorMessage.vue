<script setup lang="ts"></script>

<template>
  <Transition name="warning">
    <p class="warning-message">
      <slot></slot>
    </p>
  </Transition>
</template>

<style scoped>
.warning-message {
  display: flex;
  justify-content: center;
  font-size: 16px;
  padding-left: 20px;
  color: #f44242;
  transition-duration: 0.3s;
  transform: translateY(-1px);
}

.warning-enter-active,
.warning-leave-active {
  transition: opacity 0.5s ease;
}

.warning-enter-from,
.warning-leave-to {
  transition: opacity 0.5s ease;
  opacity: 0;
}
</style>
