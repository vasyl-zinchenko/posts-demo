// import { useUserStore } from "./store/user";

// describe("useUserStore", () => {
//   it("fetches user info correctly", async () => {
//     const mockFetch = jest.fn();
//     global.fetch = mockFetch;

//     const user = { id: 4, name: "John Doe", email: "john.doe@example.com" };
//     const userStore = useUserStore();
//     userStore.setUserInfo(user);

//     await userStore.getUserInfo();

//     expect(mockFetch).toHaveBeenCalledWith(
//       "https://jsonplaceholder.typicode.com/users/4"
//     );

//     expect(userStore.userInfo).toEqual(user);
//   });
// });
