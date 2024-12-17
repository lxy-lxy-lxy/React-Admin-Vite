import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import flip from "lodash-es/flip";
import toArray from "lodash-es/toArray";

const createFlipFn = (fn) => {
  return flip(function () {
    const args = toArray(arguments);
    return fn(...args);
  });
};

export default function createZustandStore(constructor, config = {}) {
  const fp = [immer];

  if (config.persistConfig) {
    fp.push(createFlipFn(persist).bind(null, config.persistConfig));
  }

  if (config.devtoolsConfig) {
    fp.push(createFlipFn(devtools).bind(null, config.devtoolsConfig));
  }

  const addUpdater = (set, get) => {
    const _ = constructor(set, get);
    _.update = (updater) => {
      const config = { ...get() };
      updater(config);
      set(() => config);
    };
    return _;
  };

  return create()(
    fp.reduce((prev, next) => {
      return next(prev);
    }, addUpdater),
  );
}
