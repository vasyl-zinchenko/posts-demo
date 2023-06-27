<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  postId: number;
  setIsOpenDeleteWidnow: (value: boolean) => void;
  removePost: (id: number) => void;
  isOpenDeleteWidnow: boolean;
}

const props = defineProps<Props>();
const { postId } = toRefs(props);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div class="modal" v-if="isOpenDeleteWidnow">
        <dialog open>
          <p>Are you sure you want to remove this post?</p>
          <div class="modal__action">
            <button
              class="button button__save"
              @click="
                removePost(postId);
                setIsOpenDeleteWidnow(false);
              "
            >
              Confirm
            </button>
            <button
              class="button button__cancel"
              @click="setIsOpenDeleteWidnow(false)"
            >
              Cancel
            </button>
          </div>
        </dialog>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: #00000046;

  &__action {
    display: flex;
    justify-content: end;
    gap: 10px;
    margin-top: 20px;
  }
}

dialog {
  width: 250px;
  top: 30%;
  border: none;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
