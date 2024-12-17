import createZustandStore from "@stores/createZustandStore";
import { createJSONStorage } from "zustand/middleware";

const useSessionStore = createZustandStore(
  (set) => ({
    tagHistory: [],
    setTagHistory: (tagHistory, opType = 1) =>
      set((state) => {
        if (
          opType === 1 &&
          !state.tagHistory.find((item) => item === tagHistory)
        ) {
          state.tagHistory = state.tagHistory.concat([tagHistory]);
        } else if (opType === 0) {
          state.tagHistory = state.tagHistory.filter(
            (item) => item !== tagHistory,
          );
        }
      }),
    clearTagHistory: () =>
      set((state) => {
        state.tagHistory = [];
      }),
  }),
  {
    persistConfig: {
      name: "sessionStore",
      storage: createJSONStorage(() => sessionStorage),
    },
    devtoolsConfig: { name: "sessionLog" },
  },
);

export default useSessionStore;
