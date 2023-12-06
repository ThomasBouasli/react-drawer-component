import React, {
  MouseEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { twMerge } from "tailwind-merge";
import { DrawerProvider, useDrawer } from "../provider/drawer";
import { animated } from "@react-spring/web";

const Provider = DrawerProvider;

const Root = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, externalRef) => {
    const { y, containerRef } = useDrawer();

    // This is a hack to get access to the ref while still using the forwardRef
    useImperativeHandle(
      externalRef,
      () => containerRef.current as HTMLInputElement
    );

    return (
      <animated.div
        id="drawer"
        className={twMerge("relative", className)}
        ref={containerRef}
        style={{
          y: y.to((v) => `calc(100% - ${v}px)`),
        }}
        {...props}
      />
    );
  }
);

const Handle = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, externalRef) => {
    const { set, containerRef, y, open, close, handleRef } = useDrawer();

    const [firstY, setFirstY] = useState<number>();
    const [dragging, setDragging] = useState(false);
    const [clicking, setClicking] = useState(false);

    useImperativeHandle(
      externalRef,
      () => handleRef.current as HTMLInputElement
    );

    const handleDrag = useCallback(
      (e: PointerEvent) => {
        if (!clicking) return;
        if (!handleRef.current) return;
        if (!containerRef.current) return;

        let f: number;

        if (!firstY) {
          f = containerRef.current.getBoundingClientRect().y;
          setFirstY(f);
        } else {
          f = firstY;
        }

        setDragging(true);

        const middleOfHandle = handleRef.current.clientHeight / 2;

        const mouseY = e.clientY + middleOfHandle;

        const y = -(mouseY - f);

        set(y);
      },
      [clicking, set, handleRef, containerRef, firstY]
    );

    const handleMouseUp = useCallback(
      (e: PointerEvent | TouchEvent) => {
        if (!clicking) return;
        if (!containerRef.current) return;

        if (dragging) {
          setDragging(false);

          if (y.get() > containerRef.current.clientHeight / 2) {
            open();
            setFirstY(containerRef.current.getBoundingClientRect().bottom);
          } else {
            close();
            setFirstY(undefined);
          }
        } else {
          if (y.get() === 0) {
            open();
            setFirstY(containerRef.current.getBoundingClientRect().bottom);
          } else {
            close();
            setFirstY(undefined);
          }
        }

        setClicking(false);
      },
      [clicking, dragging, containerRef, y, open, close]
    );

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        setClicking(true);
      },
      []
    );

    useEffect(() => {
      window.addEventListener("pointermove", handleDrag);

      return () => {
        window.removeEventListener("pointermove", handleDrag);
      };
    }, [handleDrag]);

    useEffect(() => {
      window.addEventListener("pointerup", handleMouseUp);

      return () => {
        window.removeEventListener("pointerup", handleMouseUp);
      };
    }, [handleMouseUp]);

    return (
      <div
        id="drawer-handle"
        className={twMerge(
          className,
          "cursor-pointer select-none absolute left-0 bottom-full"
        )}
        ref={handleRef}
        onMouseDown={handleMouseDown}
        {...props}
      />
    );
  }
);

const Content = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      id="drawer-content"
      className={twMerge(className)}
      ref={ref}
      {...props}
    />
  );
});

export const Drawer = {
  Provider,
  Root,
  Handle,
  Content,
};
