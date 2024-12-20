import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  devtools,
  persist,
  subscribeWithSelector,
  createJSONStorage,
} from "zustand/middleware";

const useSessionStore = create<
  SessionStore.SessionState,
  [
    ["zustand/immer", never],
    ["zustand/devtools", never],
    ["zustand/subscribeWithSelector", never],
    ["zustand/persist", GlobalStore.GlobalState],
  ]
>(
  immer(
    devtools(
      subscribeWithSelector(
        persist(
          (set) => ({
            tagHistory: [],
            setTagHistory: (tagHistory, opType = 1) =>
              set((state) => {
                if (
                  opType === 1 &&
                  !state.tagHistory.find((item) => item === tagHistory)
                ) {
                  state.tagHistory.push(tagHistory);
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
            name: "sessionStore",
            storage: createJSONStorage(() => sessionStorage),
          },
        ),
      ),
      {
        enabled: true,
        name: "sessionStore",
      },
    ),
  ),
);

export default useSessionStore;
