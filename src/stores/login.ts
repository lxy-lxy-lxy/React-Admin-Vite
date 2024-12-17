import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "@services/axios";

const login = "/user/login";

const useLoginStore = create()(
  persist(
    (set) => ({
      userInfo: null,
      getUserInfo: async (params) => {
        const { token, ...res } = await axios.post(login, {
          ...params,
        });
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
