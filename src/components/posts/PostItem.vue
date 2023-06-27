<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Post } from "../../types/models";
import { ref, toRefs } from "vue";
import { useUserStore } from "../../store/user";
import EditedPost from "./EditedPost.vue";
import { usePostStore } from "../../store/post";
import ModalRemove from "../../components/modal/ModalRemove.vue";

interface Props {
  post: Post;
}

const props = defineProps<Props>();
const { post } = toRefs(props);

const isOpenDeleteWidnow = ref<boolean>(false);

function setIsOpenDeleteWidnow(value: boolean) {
  isOpenDeleteWidnow.value = value;
}

const userStore = useUserStore();
const postStore = usePostStore();
const isEdited = ref<boolean>(false);

function setIsEdited(value: boolean) {
  isEdited.value = value;
}

function removePost(id: number) {
  console.log(postStore.userPosts);
  postStore.userPosts = postStore.userPosts.filter(
    (post: Post) => post.id !== id
  );
  console.log(postStore.userPosts);
}

function editPost() {
  isEdited.value = true;
}
</script>

<template>
  <div v-if="!isEdited" class="post">
    <RouterLink :to="{ name: 'post', params: { id: post.id } }">
      <p class="post__title">
        {{ post.title }}
      </p>
    </RouterLink>

    <p class="post__body">{{ post.body }}</p>

    <div class="post__actions" v-if="post.userId === userStore.userId">
      <button @click="editPost" class="button button__edit post__edit">
        Edit
      </button>

      <button
        @click="isOpenDeleteWidnow = true"
        class="button button__delete post__edit"
      >
        Delete
      </button>
    </div>
  </div>

  <EditedPost :post="post" v-if="isEdited" :setIsEdited="setIsEdited" />

  <ModalRemove
    :removePost="removePost"
    :setIsOpenDeleteWidnow="setIsOpenDeleteWidnow"
    :postId="post.id"
    :isOpenDeleteWidnow="isOpenDeleteWidnow"
  />
</template>

<style lang="scss" scoped>
select {
  font-size: 14px;
}

.filter {
  margin-bottom: 20px;

  &__buttons {
    display: flex;
    margin-top: 10px;
    gap: 15px;

    &_my-posts {
      background-color: dodgerblue;
    }

    &_all-posts {
      background-color: teal;
    }
  }
}
.posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.post {
  border: 0.5px solid rgb(229, 226, 226);
  padding: 10px;
  min-height: 70px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;

  transition: 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  &__title,
  &__body {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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
