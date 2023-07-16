import { tv } from "tailwind-variants";

export const button = tv({
  base: [
    "rounded-sm border-2 border-cream bg-white px-4 py-2 text-brown",
    "hover:border-lightbrown hover:bg-lightbrown hover:text-white",
    "active:border-cream active:bg-brown active:text-white",
  ],
});
