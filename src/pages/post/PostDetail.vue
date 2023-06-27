<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "../../store/post";
import { useUserStore } from "../../store/user";
import TheComments from "../../components/comments/TheComments.vue";
import ErrorMessage from "../../components/error/ErrorMessage.vue";
import TheLoader from "../../components/loader/TheLoader.vue";
import EditedPost from "../../components/posts/EditedPost.vue";
import NotFound from "../NotFound.vue";
import { Post } from "../../types/models";
import ModalRemove from "../../components/modal/ModalRemove.vue";

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const userStore = useUserStore();

const isDataLoaded = ref<boolean>(false);
const isEdited = ref<boolean>(false);
const isOpenDeleteWidnow = ref<boolean>(false);

function editPost() {
  isEdited.value = true;
}

function setIsEdited(value: boolean) {
  isEdited.value = value;
}

onMounted(async () => {
  isDataLoaded.value = false;
  await postStore.getPostById(+route.params.id);
  await userStore.getUserByPost();
  await postStore.getPostComment();
  isDataLoaded.value = true;
});

const postIsExisted = computed(() => {
  return Object.keys(postStore.currentPost).length === 0;
});

function removePost(id: number) {
  console.log(postStore.userPosts);
  postStore.userPosts = postStore.userPosts.filter(
    (post: Post) => post.id !== id
  );
  router.replace("/posts");
}

function setIsOpenDeleteWidnow(value: boolean) {
  isOpenDeleteWidnow.value = value;
}
</script>

<template>
  <BaseContainer>
    <ErrorMessage v-if="postStore.isError">
      {{ postStore.errorMessage }}
    </ErrorMessage>

    <TheLoader v-if="!isDataLoaded" />

    <div
      class="post-wrapper"
      v-if="
        isDataLoaded &&
        userStore.userByPost &&
        !postStore.isError &&
        !postIsExisted
      "
    >
      <section class="post-detail" v-if="!isEdited">
        <h2 class="post-detail__title">{{ postStore.currentPost.title }}</h2>

        <p class="post-detail__author">
          Posted by: {{ userStore.userByPost.name }}
        </p>

        <p class="post-detail__body">{{ postStore.currentPost.body }}</p>

        <div
          class="post__actions"
          v-if="postStore.currentPost.userId === userStore.userId"
        >
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
      </section>

      <EditedPost
        :post="postStore.currentPost"
        v-if="isEdited"
        :setIsEdited="setIsEdited"
      />

      <TheComments :comments="postStore.postComments" />
    </div>
  </BaseContainer>

  <NotFound
    v-if="postIsExisted && !postStore.isLoading && !postStore.isError"
  />

  <ModalRemove
    :removePost="removePost"
    :setIsOpenDeleteWidnow="setIsOpenDeleteWidnow"
    :postId="postStore.currentPost.id"
    :isOpenDeleteWidnow="isOpenDeleteWidnow"
  />
</template>

<style lang="scss" scoped>
.post-wrapper {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  margin: 10px;
}
.post-detail {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;

  &__title {
    font-weight: 700;
    color: black;
    &:first-letter {
      text-transform: uppercase;
    }
  }

  &__author {
    color: rgb(172, 111, 107);
    font-size: 13px;
  }

  &__body {
    &:first-letter {
      text-transform: uppercase;
    }
  }

  .post {
    &__actions {
      display: flex;
      justify-content: end;
      gap: 10px;
      margin-top: 5px;
    }
  }
}
</style>
