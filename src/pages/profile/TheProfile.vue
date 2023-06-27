<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useUserStore } from "../../store/user";
const userStore = useUserStore();

onMounted(() => {
  userStore.getUserInfo();
});

const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <BaseContainer>
    <p>Name: {{ userInfo.name }}</p>
    <p>Username: {{ userInfo.username }}</p>
    <p>
      Email: <a :href="`mailto:${userInfo.email}`">{{ userInfo.email }}</a>
    </p>
  </BaseContainer>
</template>

<style scoped></style>
