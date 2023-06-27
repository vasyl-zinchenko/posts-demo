<script setup lang="ts">
import { computed } from "vue";

import { toRefs } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
}

const props = defineProps<Props>();
const { currentPage, totalPages } = toRefs(props);

const emit = defineEmits<{
  (e: "goToPage", page: number): void;
  (e: "goToFirstPage"): void;
  (e: "goToLastPage"): void;
  (e: "goToPreviousPage"): void;
  (e: "goToNextPage"): void;
}>();

const displayedPages = computed(() => {
  const pages = [];
  let start = Math.max(1, currentPage.value - 2);
  let end = Math.min(totalPages.value, start + 4);

  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

function goToPage(page: number) {
  emit("goToPage", page);
}

function goToFirstPage() {
  emit("goToFirstPage");
}

function goToLastPage() {
  emit("goToLastPage");
}

function goToPreviousPage() {
  emit("goToPreviousPage");
}

function goToNextPage() {
  emit("goToNextPage");
}
</script>

<template>
  <div class="pagination">
    <button @click="goToFirstPage" :disabled="currentPage === 1">❮❮</button>
    <button @click="goToPreviousPage" :disabled="currentPage === 1">❮</button>

    <span class="pagination__pages">
      <span v-if="currentPage > 2">...</span>
      <button
        v-for="page in displayedPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </button>
      <span v-if="currentPage < totalPages - 1">...</span>
    </span>

    <button @click="goToNextPage" :disabled="currentPage === totalPages">
      ❯
    </button>
    <button @click="goToLastPage" :disabled="currentPage === totalPages">
      ❯❯
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;

  &__pages {
    display: flex;
    gap: 2.5px;

    @media (min-width: 425px) {
      gap: 5px;
    }
  }
}

button {
  padding: 2.5px 5px;
  border: none;
  cursor: pointer;
  background-color: #f0f0f0;
  color: #333;
  font-size: 12px;

  @media (min-width: 425px) {
    padding: 5px 10px;
    font-size: 14px;
  }
}

button:disabled {
  cursor: not-allowed;
  background-color: #ccc;
}

button.active {
  font-weight: bold;
  background-color: dodgerblue;
  color: white;
}

span {
  margin: 0 5px;
}
</style>
