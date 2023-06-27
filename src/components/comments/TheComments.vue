<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from "vue";
import type { Comment } from "../../types/models";
import { usePostStore } from "../../store/post";
import { useRoute } from "vue-router";
import { useUserStore } from "../../store/user";
import CommentItem from "./CommentItem.vue";

interface Props {
  comments: Comment[];
}

onMounted(() => {
  userStore.getUserInfo();
});

const props = defineProps<Props>();
const { comments } = toRefs(props);

const route = useRoute();

const postStore = usePostStore();
const userStore = useUserStore();

const isComment = ref<boolean>(false);
const newTitle = ref<string>("");
const newBody = ref<string>("");
const postComments = ref<Comment[]>([...comments.value]);

function addTemporaryComment() {
  const newComments = {
    name: newTitle.value,
    body: newBody.value,
    email: userStore.userInfo.email,
    id: new Date(),
  };
  setTimeout(() => {
    if (!postStore.notification) {
      postComments.value.unshift(newComments as any);
    }
  }, 100);

  resetInput();
}

function resetInput() {
  newTitle.value = "";
  newBody.value = "";
}

function cancelInput() {
  isComment.value = false;
  resetInput();
}

function saveComment() {
  postStore.postComment(+route.params.id, newTitle.value, newBody.value);
  addTemporaryComment();
}

const sortedComments = computed(() => {
  const commentsCopy = [...postComments.value];
  return commentsCopy.sort((a, b) => b.id - a.id);
});

const disabledButton = computed(() => {
  return (
    newTitle.value.trim().length === 0 || newBody.value.trim().length === 0
  );
});
</script>

<template>
  <section class="comments">
    <h3>{{ postComments.length }} Comments:</h3>
    <div class="underline"></div>
    <button class="button button__add-comment" @click="isComment = true">
      💬 Comment
    </button>

    <section class="comments__new" v-if="isComment">
      <input v-model="newTitle" placeholder="Title" />
      <textarea v-model="newBody" rows="4" placeholder="Comment..." />
      <div class="comments__actions">
        <button
          class="button button__save"
          @click="saveComment"
          :disabled="disabledButton"
        >
          Save
        </button>

        <button @click="cancelInput" class="button button__cancel">
          Cancel
        </button>
      </div>
    </section>

    <TransitionGroup name="list">
      <CommentItem
        v-for="comment in sortedComments"
        :key="comment.id"
        :comment="comment"
      />
    </TransitionGroup>
  </section>
</template>

<style lang="scss" scoped>
.comments {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 20px;
  padding: 10px;

  &__new {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__actions {
    display: flex;
    gap: 10px;
  }
}

.underline {
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-weight: 600;
}

.button {
  &__add-comment {
    color: black;
  }
}

h3 {
  display: flex;
  margin-bottom: -15px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  background-color: rgb(178, 227, 178);
}
</style>
