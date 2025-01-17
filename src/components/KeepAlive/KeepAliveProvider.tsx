import { createContext, FC, PropsWithChildren } from "react";

// const KeepAliveContext = createContext<{
//   registerActiveEffect: (effectCallback: unknown) => void;
//   registerDeactiveEffect: (effectCallback: unknown) => void;
// }>({
//   registerActiveEffect: () => void 0,
//   registerDeactiveEffect: () => void 0,
// });

const KeepAliveContext = createContext({});

// export const useActiveEffect = (callback) => {
//   const { registerActiveEffect } = useContext(KeepAliveContext);
//
//   useEffect(() => {
//     registerActiveEffect?.(callback);
//   }, []);
// };
//
// export const useDeactiveEffect = (callback) => {
//   const { registerDeactiveEffect } = useContext(KeepAliveContext);
//
//   useEffect(() => {
//     registerDeactiveEffect?.(callback);
//   }, []);
// };

const KeepAliveProvider: FC<PropsWithChildren> = ({ children }) => {
  // const activeEffects = useRef([]);
  // const deactiveEffects = useRef([]);

  /*const registerActiveEffect = (callback) => {
    activeEffects.current.push(() => {
      callback();
    });
  };

  const registerDeactiveEffect = (callback) => {
    deactiveEffects.current.push(() => {
      callback();
    });
  };*/

  /* useEffect(() => {
    if (active) {
      activeEffects.current.forEach((effect) => {
        effect();
      });
    } else {
      deactiveEffects.current.forEach((effect) => {
        effect();
      });
    }
  }, [active]);*/

  return (
    <KeepAliveContext.Provider
      value={{}}
      // value={{ registerActiveEffect, registerDeactiveEffect }}
    >
      {children}
    </KeepAliveContext.Provider>
  );
};

export default KeepAliveProvider;
