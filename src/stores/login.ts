import { create } from "zustand";
import { persist } from "zustand/middleware";
import { post } from "@/services/axios.ts";

const login = "/user/login";

const useLoginStore = create<LoginInfo.LoginState>()(
  persist(
    (set) => ({
      userInfo: undefined,
      getUserInfo: async (params) => {
        const data = await post<LoginInfo.User & { token: string }>(
          login,
          params,
        );
        const { token, ...res } = data;
        localStorage.setItem("token", token);
        set(() => ({ userInfo: res }));
      },
      setUserInfo: (info) => set(() => ({ userInfo: info })),
    }),
    {
      name: "userInfo",
    },
  ),
);

export default useLoginStore;
