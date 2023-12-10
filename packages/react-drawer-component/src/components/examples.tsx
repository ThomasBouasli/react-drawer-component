import React from "react";

import { GripHorizontal, GripVertical } from "lucide-react";

import { useDrawer } from "../provider/drawer";
import { Drawer } from "./drawer";

export const Left = () => {
  const drawer = useDrawer({
    position: "left",
  });

  return (
    <div
      className="h-96 w-96 bg-zinc-800 relative overflow-hidden"
      ref={drawer.containerRef}
    >
      <div className="flex flex-col gap-4 p-4 ml-10">
        <h1 className="text-zinc-100">Page Content</h1>
        <p className="text-zinc-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          voluptas, voluptatibus, quidem, quibusdam magni quae reprehenderit
          voluptatem dolorum nesciunt autem voluptatum laudantium. Quisquam,
          ipsum. Quae, voluptatum. Quisquam, voluptatum. Quisquam, ipsum. Quae,
          voluptatum.
        </p>
      </div>
      <Drawer.Provider {...drawer}>
        <Drawer.Root className="bg-zinc-900 flex flex-col absolute top-0 left-0 w-72 h-full">
          <Drawer.Handle className="bg-zinc-900 flex items-center justify-center h-full text-zinc-50 absolute left-full top-0 shadow-md shadow-black">
            <GripVertical size={32} />
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
  );
};

export const Right = () => {
  const drawer = useDrawer({
    position: "right",
  });

  return (
    <div
      className="h-96 w-96 bg-zinc-800 relative overflow-hidden"
      ref={drawer.containerRef}
    >
      <div className="flex flex-col gap-4 p-4 mr-10">
        <h1 className="text-zinc-100">Page Content</h1>
        <p className="text-zinc-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          voluptas, voluptatibus, quidem, quibusdam magni quae reprehenderit
          voluptatem dolorum nesciunt autem voluptatum laudantium. Quisquam,
          ipsum. Quae, voluptatum. Quisquam, voluptatum. Quisquam, ipsum. Quae,
          voluptatum.
        </p>
      </div>
      <Drawer.Provider {...drawer}>
        <Drawer.Root className="bg-zinc-900 flex flex-col absolute top-0 right-0 w-72 h-full">
          <Drawer.Handle className="bg-zinc-900 flex items-center justify-center h-full text-zinc-50 absolute right-full top-0 shadow-md shadow-black">
            <GripVertical size={32} />
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
  );
};
export const Top = () => {
  const drawer = useDrawer({
    position: "top",
  });

  return (
    <div
      className="h-96 w-96 bg-zinc-800 relative overflow-hidden"
      ref={drawer.containerRef}
    >
      <div className="flex flex-col gap-4 p-4 mt-10">
        <h1 className="text-zinc-100">Page Content</h1>
        <p className="text-zinc-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          voluptas, voluptatibus, quidem, quibusdam magni quae reprehenderit
          voluptatem dolorum nesciunt autem voluptatum laudantium. Quisquam,
          ipsum. Quae, voluptatum. Quisquam, voluptatum. Quisquam, ipsum. Quae,
          voluptatum.
        </p>
      </div>
      <Drawer.Provider {...drawer}>
        <Drawer.Root className="bg-zinc-900 flex flex-col absolute top-0 left-0 w-full">
          <Drawer.Handle className="bg-zinc-900 flex items-center justify-center w-full text-zinc-50 absolute top-full left-0 shadow-md shadow-black">
            <GripHorizontal size={32} />
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
  );
};

export const Bottom = () => {
  const drawer = useDrawer({
    position: "bottom",
  });

  return (
    <div
      className="h-96 w-72 bg-zinc-800 relative overflow-hidden"
      ref={drawer.containerRef}
    >
      <div className="flex flex-col gap-4 p-4 mb-10">
        <h1 className="text-zinc-100">Page Content</h1>
        <p className="text-zinc-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          voluptas, voluptatibus, quidem, quibusdam magni quae reprehenderit
          voluptatem dolorum nesciunt autem voluptatum laudantium. Quisquam,
          ipsum. Quae, voluptatum. Quisquam, voluptatum. Quisquam, ipsum. Quae,
          voluptatum.
        </p>
      </div>
      <Drawer.Provider {...drawer}>
        <Drawer.Root className="bg-zinc-900 flex flex-col absolute bottom-0 left-0 w-full">
          <Drawer.Handle className="bg-zinc-900 flex items-center justify-center w-full text-zinc-50 absolute bottom-full left-0 shadow-md shadow-black">
            <GripHorizontal size={32} />
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
  );
};

export const ButtonBased = () => {
  const drawer = useDrawer({
    position: "bottom",
  });

  return (
    <div
      className="h-96 w-96 bg-zinc-800 relative overflow-hidden"
      ref={drawer.containerRef}
    >
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-zinc-100">Page Content</h1>
        <p className="text-zinc-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          voluptas, voluptatibus, quidem, quibusdam magni quae reprehenderit
          voluptatem dolorum nesciunt autem voluptatum laudantium. Quisquam,
          ipsum. Quae, voluptatum. Quisquam, voluptatum. Quisquam, ipsum. Quae,
          voluptatum.
        </p>
        <button
          className="text-zinc-50 p-4 border border-zinc-50"
          onClick={drawer.open}
        >
          Open
        </button>
      </div>
      {drawer.state === "open" && (
        <div
          className="top-0 left-0 absolute w-full h-full bg-zinc-950/20"
          onClick={close}
        />
      )}
      <Drawer.Provider {...drawer}>
        <Drawer.Root className="bg-zinc-900 flex flex-col absolute bottom-0 left-0 w-full z-10">
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
  );
};
