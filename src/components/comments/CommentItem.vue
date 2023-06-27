<script setup lang="ts">
import { toRefs } from "vue";
import { Comment } from "../../types/models";

interface Props {
  comment: Comment;
}

const props = defineProps<Props>();
const { comment } = toRefs(props);
</script>

<template>
  <section class="comment">
    <p class="comment__name">{{ comment.name }}</p>
    <p class="comment__body">{{ comment.body }}</p>
    <p>
      <a :href="`mailto:${comment.email}`">{{ comment.email }}</a>
    </p>
  </section>
</template>

<style scoped lang="scss">
.comment {
  &__name {
    font-weight: 700;
  }

  &__body {
    color: gray;
  }
}
</style>
