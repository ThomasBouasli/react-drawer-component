import { Drawer, useDrawer } from "react-headless-drawer";
import { GripHorizontal } from "lucide-react";

const App = () => {
  const drawer = useDrawer({
    position: "bottom",
    onClose() {
      console.log("closed");
    },
    onOpen() {
      console.log("opened");
    },
    onDrag() {
      console.log("dragging");
    },
    spring: {
      mass: 0.5,
      friction: 1,
      tension: 30,
      bounce: 0.1,
    },
  });

  return (
    <main
      ref={drawer.containerRef}
      className="overflow-hidden h-[100dvh] relative bg-zinc-800"
    >
      <article className="flex flex-col gap-8 p-8 pb-20 h-[100dvh]">
        <h1 className="text-zinc-100 text-5xl text-center font-black">
          React Drawer Component
        </h1>
        <span className="text-zinc-100 text-2xl text-center font-extralight">
          A Headless drawer component
        </span>
        <span className="text-zinc-100 text-2xl">Installation:</span>
        <span className="text-zinc-100">With npm:</span>
        <code className="bg-zinc-900 text-lime-300 p-4 border-zinc-700 border rounded-lg">
          <span className="select-none">$ </span>npm install
          react-drawer-component
        </code>
        <span className="text-zinc-100">With pnpm:</span>
        <code className="bg-zinc-900 text-lime-300 p-4 border-zinc-700 border rounded-lg">
          <span className="select-none">$ </span>pnpm add react-drawer-component
        </code>
        <span className="text-zinc-100">With yarn:</span>
        <code className="bg-zinc-900 text-lime-300 p-4 border-zinc-700 border rounded-lg">
          <span className="select-none">$ </span>yarn add react-drawer-component
        </code>
      </article>
      <Drawer.Provider {...drawer}>
        <Drawer.Root className="absolute bottom-0 left-0 w-full bg-zinc-800">
          <Drawer.Handle className="absolute bottom-full left-0 w-full flex justify-center bg-zinc-900 border-b-2 border-zinc-800 p-4">
            <GripHorizontal className="text-zinc-100" />
          </Drawer.Handle>
          <Drawer.Content className="min-h-[300px] bg-zinc-900 p-8">
            <img
              src="/important-image.webp"
              alt="Never gonna give you up"
              className="h-full w-full object-contain"
            />
          </Drawer.Content>
        </Drawer.Root>
      </Drawer.Provider>
    </main>
  );
};
export default App;
