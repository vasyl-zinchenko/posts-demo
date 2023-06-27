<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { usePostStore } from "../../store/post";
import { PostType, SortType } from "../../types/enums";
import PostItem from "../../components/posts/PostItem.vue";
import TheLoader from "../../components/loader/TheLoader.vue";
import ErrorMessage from "../../components/error/ErrorMessage.vue";
import ThePagination from "../../components/pagination/ThePagination.vue";
const postStore = usePostStore();

const selected = ref<string>("");
const typeOfPost = ref<string>(PostType.AllPosts);

const posts = computed(() => {
  return typeOfPost.value === PostType.AllPosts
    ? postStore.allPosts
    : postStore.userPosts;
});

const currentPage = ref(1);
const pageSize = 5;

function setTypeOfPost(type: string) {
  typeOfPost.value = type;
}

onMounted(() => {
  postStore.getPosts();
});

const sortedPost = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  const sortedPosts = [...posts.value].sort((a, b) => {
    return selected.value === SortType.New ? a.id - b.id : b.id - a.id;
  });
  return sortedPosts.slice(start, end);
});

const totalItems = computed(() => posts.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize));

function goToPage(pageNumber: number) {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
}

function goToFirstPage() {
  currentPage.value = 1;
}

function goToLastPage() {
  currentPage.value = totalPages.value;
}

function goToPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function showAllPost() {
  if (typeOfPost.value !== PostType.AllPosts) {
    currentPage.value = 1;
  }
  postStore.getPosts();
  setTypeOfPost(PostType.AllPosts);
}

function showUserPost() {
  if (typeOfPost.value !== PostType.UserPosts) {
    currentPage.value = 1;
  }
  postStore.getUserPosts();
  console.log(postStore.userPosts);
  setTypeOfPost(PostType.UserPosts);
}
</script>

<template>
  <BaseContainer>
    <h2>{{ typeOfPost }}</h2>
    <section class="filter">
      <select v-model="selected">
        <option disabled value="">Sort</option>
        <option :value="SortType.New">Newest first</option>
        <option :value="SortType.Old">Oldest first</option>
      </select>

      <section class="filter__buttons">
        <button class="button filter__buttons_my-posts" @click="showUserPost">
          Show my posts
        </button>

        <button class="button filter__buttons_all-posts" @click="showAllPost">
          Show all posts
        </button>
      </section>
    </section>

    <TheLoader v-if="postStore.isLoading" />

    <ErrorMessage
      v-if="!postStore.isLoading && postStore.isError && sortedPost.length < 1"
    >
      {{ postStore.errorMessage }}
    </ErrorMessage>

    <div class="posts">
      <PostItem v-for="post in sortedPost" :key="post.id" :post="post" />
    </div>

    <ThePagination
      v-if="!postStore.isLoading"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @goToPage="goToPage"
      @goToFirstPage="goToFirstPage"
      @goToLastPage="goToLastPage"
      @goToPreviousPage="goToPreviousPage"
      @goToNextPage="goToNextPage"
    />
  </BaseContainer>
</template>

<style lang="scss" scoped>
select {
  font-size: 14px;
}

.button {
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
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
  }

  &__actions {
    display: flex;
    justify-content: end;
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

  &__edit {
    background-color: rgba(255, 166, 0, 0.526);
    color: black;

    &:hover {
      background-color: orange;
    }
  }
}
</style>
