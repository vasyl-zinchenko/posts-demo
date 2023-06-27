<script setup lang="ts">
import { ErrorMessages, SuccesMessages } from "../../types/enums";
import { usePostStore } from "../../store/post";
import { computed } from "vue";

const postStore = usePostStore();

const notificationStyle = computed(() => {
  return {
    modal__error: Object.values(ErrorMessages).includes(postStore.notification as ErrorMessages),
    modal__updated: postStore.notification === SuccesMessages.UpdatePost,
  };
});
</script>

<template>
  <Transition name="modal">
    <div class="modal" :class="notificationStyle" v-if="postStore.notification">
      <p class="modal__message">
        {{ postStore.notification }}
      </p>
      <button
        class="button button__cancel"
        @click="postStore.setNotification('')"
      >
        Close
      </button>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal {
  position: absolute;
  background: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  z-index: 999;
  padding: 20px;
  top: 15px;
  right: 15px;
  width: 200px;
  margin-left: -150px;
  transition: all 0.5s ease;

  &__message {
    display: flex;
    font-size: 14px;
    margin-bottom: 20px;
  }

  &__error {
    border: 1px solid red;
    color: red;
  }

  &__updated {
    border: 1px solid orange;
    color: orange;
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
