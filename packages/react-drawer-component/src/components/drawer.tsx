import React, { forwardRef, useContext } from "react";

import { twMerge } from "tailwind-merge";
import { animated } from "@react-spring/web";

import "../styles/tailwind.css";
import { DrawerContext, UseDrawerReturn } from "../provider/drawer";

const Provider = ({
  children,
  ...props
}: UseDrawerReturn & { children: React.ReactNode }) => {
  return (
    <DrawerContext.Provider value={props}>{children}</DrawerContext.Provider>
  );
};

const Root = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { position, value, drawerRef } = useContext(DrawerContext);

  let style = {};

  switch (position) {
    case "left":
      style = {
        x: value.to((v) => `calc(-100% + ${v}px)`),
      };
      break;
    case "right":
      style = {
        x: value.to((v) => `calc(100% - ${v}px)`),
      };
      break;
    case "top":
      style = {
        y: value.to((v) => `calc(-100% + ${v}px)`),
      };
      break;
    case "bottom":
      style = {
        y: value.to((v) => `calc(100% - ${v}px)`),
      };
      break;
  }

  return (
    <animated.div
      id="drawer"
      className={twMerge("relative will-change-transform", className)}
      ref={drawerRef}
      style={style}
      {...props}
    />
  );
};

const Handle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { drawerHandleRef } = useContext(DrawerContext);

  return (
    <div
      id="drawer-handle"
      className={twMerge(className, "cursor-pointer select-none")}
      ref={drawerHandleRef}
      {...props}
    />
  );
};

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

Content.displayName = "Content";

export const Drawer = {
  Provider,
  Root,
  Handle,
  Content,
};
