import { tv } from "tailwind-variants";

export const button = tv({
  base: [
    "rounded-sm border-2 border-brown bg-white px-4 py-2 text-brown",
    "hover:border-lightbrown hover:bg-lightbrown hover:text-white",
    "active:border-brown active:bg-brown active:text-white",
  ],
});
