import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./drawer";
import * as Examples from "./examples";

const meta: Meta = {
  title: "Components/Drawer",
  component: Drawer.Root,
};

export default meta;

export const Left: StoryObj = {
  render: () => <Examples.Left />,
};
export const Right: StoryObj = {
  render: () => <Examples.Right />,
};

export const Top: StoryObj = {
  render: () => <Examples.Top />,
};

export const Bottom: StoryObj = {
  render: () => <Examples.Bottom />,
};

export const ButtonBased: StoryObj = {
  render: () => <Examples.ButtonBased />,
};
