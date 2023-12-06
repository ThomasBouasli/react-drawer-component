import React, {
  createContext,
  createRef,
  useCallback,
  useContext,
} from "react";

import { SpringValue, useSpring } from "@react-spring/web";

type DrawerContextType = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  set: (value: number) => void;
  y: SpringValue<number>;
  containerRef: React.RefObject<HTMLDivElement>;
  handleRef: React.RefObject<HTMLDivElement>;
};

export const DrawerContext = createContext<DrawerContextType>({
  open: () => {},
  close: () => {},
  toggle: () => {},
  set: () => {},
  y: new SpringValue(0),
  containerRef: { current: null },
  handleRef: { current: null },
});

export const DrawerProvider = ({ children }) => {
  const containerRef = createRef<HTMLDivElement>();
  const handleRef = createRef<HTMLDivElement>();

  const maxY = useCallback(() => {
    const container = containerRef.current;

    if (!container) return 0;

    return container.clientHeight;
  }, [containerRef]);

  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: {
      mass: 1,
      friction: 1,
      bounce: 0.1,
    },
  }));

  const open = useCallback(() => {
    api.start({ y: maxY() });
  }, [api, maxY]);

  const close = useCallback(() => {
    api.start({ y: 0 });
  }, [api]);

  const toggle = useCallback(() => {
    const current = y.get();

    if (current === 0) {
      open();
    } else {
      close();
    }
  }, [y, open, close]);

  const set = useCallback(
    (value: number) => {
      if (value < 0) return;
      if (value > maxY()) return;

      api.set({ y: value });
    },
    [api, maxY]
  );

  return (
    <DrawerContext.Provider
      value={{
        open,
        close,
        toggle,
        set,
        y,
        containerRef,
        handleRef,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
