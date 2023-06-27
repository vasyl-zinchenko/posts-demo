import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { User } from "../types/models";
import { usePostStore } from "./post";

export const useUserStore = defineStore("userStore", () => {
  const BASE_URL = ref<string>("https://jsonplaceholder.typicode.com");
  const userId = ref<number>(4);
  const userInfo = reactive({} as User);
  const userByPost = reactive({} as User);

  const postStore = usePostStore();

  function setUserInfo(user: User) {
    Object.assign(userInfo, user);
  }
  function setUserByPost(user: User) {
    Object.assign(userByPost, user);
  }

  async function getUserInfo() {
    try {
      const response = await fetch(`${BASE_URL.value}/users/${userId.value}`);
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserByPost() {
    try {
      const response = await fetch(
        `${BASE_URL.value}/users/${postStore.currentPost.userId}`
      );
      const data = await response.json();
      console.log(data);
      setUserByPost(data);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getUserInfo,
    getUserByPost,
    userInfo,
    userByPost,
    userId,
  };
});
