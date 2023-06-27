<script setup lang="ts">
import { Post } from "../../types/models";
import { ref, toRefs } from "vue";
import { usePostStore } from "../../store/post";

interface Props {
  post: Post;
  setIsEdited: (value: boolean) => void;
}

const props = defineProps<Props>();
const { post } = toRefs(props);

const postStore = usePostStore();
const newTitle = ref<string>(post.value.title);
const newBody = ref<string>(post.value.body.replace(/\n/g, ""));

function saveEditedPost() {
  postStore.updatePost(post.value.id, {
    title: newTitle.value,
    body: newBody.value,
  });
  props.setIsEdited(false);
  postStore.getPosts();
}
</script>

<template>
  <div class="post">
    <textarea v-model="newTitle" rows="1" class="post__title--edit" />
    <textarea v-model="newBody" rows="4" class="post__body--edit" />

    <div class="post__actions">
      <button class="button button__save post__edit" @click="saveEditedPost">
        Save
      </button>

      <button
        @click="setIsEdited(false)"
        class="button button__cancel post__edit"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
select {
  font-size: 14px;
}

.post {
  border: 0.5px solid rgb(229, 226, 226);
  padding: 10px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  &__title {
    font-weight: 700;
    color: #0064cc;

    &:hover {
      color: #0a95ff;
    }
    &:first-letter {
      text-transform: uppercase;
    }

    &--edit {
      width: 100%;
    }
  }

  &__actions {
    display: flex;
    justify-content: end;
    gap: 10px;
    margin-top: 5px;
  }

  &__body {
    color: gray;

    &:first-letter {
      text-transform: uppercase;
    }

    &--edit {
      width: 100%;
    }
  }
}
</style>
