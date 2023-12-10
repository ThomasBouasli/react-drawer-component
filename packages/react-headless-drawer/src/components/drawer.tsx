import React, { forwardRef, useContext } from "react";

import { animated } from "@react-spring/web";

import "../styles/index.css";
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
      className={`react-headless-drawer_drawer ${className}`}
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
      className={`react-headless-drawer_handle ${className}`}
      ref={drawerHandleRef}
      {...props}
    />
  );
};

const Content = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div id="drawer-content" className={className} ref={ref} {...props} />;
});

Content.displayName = "Content";

export const Drawer = {
  Provider,
  Root,
  Handle,
  Content,
};
