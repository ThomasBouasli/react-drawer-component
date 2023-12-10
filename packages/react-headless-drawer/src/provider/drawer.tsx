import React, {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  SpringValue,
  useSpring,
  AnimatedComponent,
  SpringConfig,
} from "@react-spring/web";

export type UseDrawerProps = {
  onOpen?: () => void;
  onClose?: () => void;
  onDrag?: () => void;
  draggable?: boolean;
  position: "left" | "right" | "top" | "bottom";
  spring?: SpringConfig;
};

export type UseDrawerReturn = {
  containerRef: React.RefObject<HTMLDivElement>;
  drawerHandleRef: React.RefObject<HTMLDivElement>;
  drawerRef: React.RefObject<AnimatedComponent<"div"> & HTMLDivElement>;
  open: () => void;
  close: () => void;
  toggle: () => void;
  value: SpringValue<number>;
  state: "open" | "closed";
  position: "left" | "right" | "top" | "bottom";
};

export const DrawerContext = createContext<UseDrawerReturn>({
  open: () => {},
  close: () => {},
  toggle: () => {},
  containerRef: createRef<HTMLDivElement>(),
  drawerRef: createRef<AnimatedComponent<"div"> & HTMLDivElement>(),
  drawerHandleRef: createRef<HTMLDivElement>(),
  state: "closed",
  value: new SpringValue(0),
  position: "bottom",
});

export const useDrawerProvider = () => {
  return useContext(DrawerContext);
};

export const useDrawer = ({ draggable = true, ...props }: UseDrawerProps) => {
  const containerRef = createRef<HTMLDivElement>();
  const drawerRef = createRef<AnimatedComponent<"div"> & HTMLDivElement>();
  const drawerHandleRef = createRef<HTMLDivElement>();

  const [dragging, setDragging] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [state, setState] = useState<"open" | "closed">("closed");

  const max = useCallback(() => {
    const drawer = drawerRef.current;

    if (!drawer) return 0;

    switch (props.position) {
      case "top":
      case "bottom":
        return drawer.clientHeight;
      case "left":
      case "right":
        return drawer.clientWidth;
      default:
        return 0;
    }
  }, [drawerRef, props.position]);

  const [{ value }, api] = useSpring(() => ({
    value: 0,
    config: props.spring,
  }));

  const open = useCallback(() => {
    api.start({ value: max() });
    setState("open");
    setDragging(false);
    setClicking(false);
    props?.onOpen && props.onOpen();
  }, [api, max, props?.onOpen]);

  const close = useCallback(() => {
    api.start({ value: 0 });
    setState("closed");
    setDragging(false);
    setClicking(false);
    props?.onClose && props.onClose();
  }, [api, props?.onClose]);

  const toggle = useCallback(() => {
    const current = value.get();

    if (current === 0) {
      open();
    } else {
      close();
    }
  }, [value, open, close]);

  const set = useCallback(
    (value: number) => {
      if (value < 0) return;
      if (value > max()) return;

      api.set({ value });

      props?.onDrag && props.onDrag();
    },
    [api, max, props?.onDrag]
  );

  const getMousePosition = useCallback(
    (e: PointerEvent) => {
      e.stopPropagation();

      const container = containerRef.current;
      const handle = drawerHandleRef.current;

      if (!handle || !container) return 0;

      const containerBox = container.getBoundingClientRect();
      const handleBox = handle.getBoundingClientRect();

      switch (props.position) {
        case "top":
          return e.clientY - containerBox.y - handleBox.height / 2;
        case "bottom":
          return -(
            e.clientY -
            containerBox.y -
            containerBox.height +
            handleBox.height / 2
          );
        case "left":
          return e.clientX - containerBox.x - handleBox.width / 2;
        case "right":
          return -(
            e.clientX -
            containerBox.x -
            containerBox.width +
            handleBox.width / 2
          );
        default:
          return 0;
      }
    },
    [props.position, drawerHandleRef, containerRef]
  );

  const getTouchPosition = useCallback(
    (e: TouchEvent) => {
      const container = containerRef.current;
      const handle = drawerHandleRef.current;

      if (!handle || !container) return 0;

      const containerBox = container.getBoundingClientRect();
      const handleBox = handle.getBoundingClientRect();

      switch (props.position) {
        case "top":
          return e.touches[0]!.clientY - containerBox.y - handleBox.height / 2;
        case "bottom":
          return -(
            e.touches[0]!.clientY -
            containerBox.y -
            containerBox.height +
            handleBox.height / 2
          );
        case "left":
          return e.touches[0]!.clientX - containerBox.x - handleBox.width / 2;
        case "right":
          return -(
            e.touches[0]!.clientX -
            containerBox.x -
            containerBox.width +
            handleBox.width / 2
          );
        default:
          return 0;
      }
    },
    [props.position, drawerHandleRef, containerRef]
  );

  const handleMouseDrag = useCallback(
    (e: PointerEvent) => {
      if (!clicking) return;

      setDragging(true);
      const value = getMousePosition(e);
      set(value);
    },
    [clicking, set, getMousePosition]
  );

  const handleTouchDrag = useCallback(
    (e: TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!clicking) return;

      setDragging(true);
      const value = getTouchPosition(e);
      set(value);
    },
    [clicking, set, getTouchPosition]
  );

  const getStuff = useCallback(() => {
    if (!drawerRef.current) return false;

    switch (props.position) {
      case "top":
        return value.get() > drawerRef.current.clientHeight / 2;
      case "bottom":
        return value.get() > drawerRef.current.clientHeight / 2;
      case "left":
        return value.get() > drawerRef.current.clientWidth / 2;
      case "right":
        return value.get() > drawerRef.current.clientWidth / 2;
      default:
        return false;
    }
  }, [drawerRef, value]);

  const handleMouseUp = useCallback(
    (e: PointerEvent | TouchEvent) => {
      if (!clicking) return;

      if (dragging) {
        if (value.get() > max() - 50 && state === "open") {
          close();
        } else if (value.get() < 50 && state === "closed") {
          open();
        } else {
          if (getStuff()) {
            open();
          } else {
            close();
          }
        }
      } else {
        if (value.get() === 0) {
          open();
        } else {
          close();
        }
      }
    },
    [clicking, dragging, getStuff, value, open, close, max, state]
  );

  const handleMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setClicking(true);
  }, []);

  useEffect(() => {
    if (!draggable) window.addEventListener("pointermove", handleMouseDrag);
    window.addEventListener("touchmove", handleTouchDrag);

    return () => {
      window.removeEventListener("pointermove", handleMouseDrag);
      window.removeEventListener("touchmove", handleTouchDrag);
    };
  }, [handleMouseDrag, draggable]);

  useEffect(() => {
    window.addEventListener("pointerup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("pointerup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseUp]);

  useEffect(() => {
    const handle = drawerHandleRef.current;

    if (!handle) return;

    handle.addEventListener("pointerdown", handleMouseDown);
    handle.addEventListener("touchstart", handleMouseDown);

    return () => {
      handle.removeEventListener("pointerdown", handleMouseDown);
      handle.removeEventListener("touchstart", handleMouseDown);
    };
  }, [handleMouseDown]);

  return {
    containerRef,
    drawerHandleRef,
    drawerRef,
    open,
    close,
    toggle,
    value,
    state,
    position: props.position,
  } as UseDrawerReturn;
};
