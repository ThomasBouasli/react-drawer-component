import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./drawer";

export default {
  title: "Components/Drawer",
  component: Drawer.Root,
} as Meta;

export const Default: StoryObj = {
  render: () => (
    <div className="h-96 w-96 bg-zinc-500 relative overflow-hidden">
      <Drawer.Provider>
        <Drawer.Root className="bg-zinc-900 flex flex-col absolute bottom-0 left-0 w-full">
          <Drawer.Handle className="bg-zinc-800 flex items-center justify-center w-full text-zinc-50">
            <h1>...</h1>
          </Drawer.Handle>
          <Drawer.Content>
            <div className="p-4">
              <h1 className="text-2xl text-zinc-50">Hello World</h1>
              <p className="text-zinc-50">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptas, voluptatibus, quidem, quibusdam magni quae
                reprehenderit voluptatem dolorum nesciunt autem voluptatum
                laudantium. Quisquam, ipsum. Quae, voluptatum. Quisquam,
                voluptatum. Quisquam, ipsum. Quae, voluptatum.
              </p>
            </div>
          </Drawer.Content>
        </Drawer.Root>
      </Drawer.Provider>
    </div>
  ),
};
