import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { Post, Comment } from "../types/models";
import { useUserStore } from "./user";
import { ErrorMessages, SuccesMessages } from "../types/enums";

export const usePostStore = defineStore("postStore", () => {
  const BASE_URL = ref<string>("https://jsonplaceholder.typicode.com");
  const allPosts = reactive<Post[]>([]);
  const userPosts = reactive<Post[]>([]);
  const currentPost = reactive({} as Post);
  const postComments = reactive<Comment[]>([]);

  const isLoading = ref<boolean>(false);
  const isUpdated = ref<boolean>(false);
  const isError = ref<boolean>(false);

  const errorMessage = ref<string>("");
  const notification = ref<ErrorMessages | SuccesMessages | string>("");

  const userStore = useUserStore();

  function setErrorMessage(message: string) {
    errorMessage.value = message;
  }

  function setNotification(message: ErrorMessages | SuccesMessages | string) {
    notification.value = message;
  }

  function setPost(data: Post[]) {
    Object.assign(allPosts, data);
  }

  function setUserPosts(data: Post[]) {
    Object.assign(userPosts, data);
  }

  function setCurrentPost(post: Post) {
    Object.assign(currentPost, post);
  }

  function setPostComments(comments: Comment) {
    Object.assign(postComments, comments);
  }

  async function getPosts() {
    try {
      isError.value = false;
      isLoading.value = true;
      const response = await fetch(`${BASE_URL.value}/posts`);
      const data = await response.json();
      setPost(data);
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      isError.value = true;
			setErrorMessage(ErrorMessages.LoadPosts);
      console.error(error);
    }
  }

  async function getPostById(id: number) {
    try {
      isError.value = false;
      isLoading.value = true;
      const response = await fetch(`${BASE_URL.value}/posts/${id}`);
      const data = await response.json();
      setCurrentPost(data);
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      isError.value = true;
      setErrorMessage(ErrorMessages.LoadPosts);
      console.error(error);
    }
  }

  async function getUserPosts() {
    try {
      isError.value = false;
      isLoading.value = true;
      const response = await fetch(
        `${BASE_URL.value}/posts?userId=${userStore.userId}`
      );
      const data = await response.json();
      setUserPosts(data);
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      isError.value = true;
      setErrorMessage(ErrorMessages.LoadPostById);
      console.error(error);
    }
  }

  async function getPostComment() {
    try {
      const response = await fetch(
        `${BASE_URL.value}/comments?postId=${currentPost.id}`
      );
      console.log(`${BASE_URL.value}/comments?postId=${currentPost.id}`);

      const data = await response.json();
      setPostComments(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function updatePost(
    postId: number,
    { title, body }: { title: string; body: string }
  ) {
    try {
      isError.value = false;
      isUpdated.value = false;
      const response = await fetch(`${BASE_URL.value}/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      const updatedResource = await response.json();

      setUserPosts(
        userPosts.map((post) => (post.id === postId ? updatedResource : post))
      );

      isUpdated.value = true;
      setNotification(SuccesMessages.UpdatePost);
    } catch (error) {
      isError.value = true;
      setNotification(ErrorMessages.UpdatePost);
      console.log(notification.value);

      console.error(error);
    } finally {
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  }

  async function postComment(postId: number, title: string, body: string) {
    try {
      const response = await fetch(
        `${BASE_URL.value}/comments?postId/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            title,
            body,
            email: userStore.userInfo.email,
            postId,
            id: Date.now(),
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      setNotification(ErrorMessages.AddComment);
    } finally {
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  }

  async function deletePost(postId: number) {
    try {
      await fetch(`${BASE_URL.value}/posts/${postId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
      setNotification(ErrorMessages.DeletePost);
    } finally {
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  }

  return {
    getPosts,
    allPosts,
    getUserPosts,
    userPosts,
    setErrorMessage,
    errorMessage,
    setNotification,
    notification,
    deletePost,
    getPostById,
    currentPost,
    getPostComment,
    postComments,
    updatePost,
    postComment,
    isLoading,
    isError,
    isUpdated,
  };
});
