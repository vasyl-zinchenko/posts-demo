<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

function isLinkActive(path: string) {
  return route.path.startsWith(path);
}
</script>

<template>
  <div class="header">
    <div class="header__wrapper">
      <RouterLink
        to="/profile"
        :class="{ 'active-nav-link': isLinkActive('/profile') }"
      >
        Profile
      </RouterLink>
      <RouterLink
        to="/posts"
        :class="{ 'active-nav-link': isLinkActive('/posts') }"
      >
        Posts
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: #333;

  &__wrapper {
    display: flex;
    gap: 20px;
    padding: 0 20px;
    max-width: 1280px;
    margin: auto;

    & > a {
      display: flex;
      color: white;
      padding: 10px 0;
    }
  }
}

.active-nav-link {
  border-bottom: 2px solid white;
}
</style>
