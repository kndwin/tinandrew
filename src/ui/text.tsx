import { styled } from "~/utils/variant";

export const Text = styled("p", "", {
  variants: {
    size: {
      heading: "text-[32px] font-cardo",
      subheading: "text-[24px] font-karla",
      body: "text-[16px] font-karla",
      display: "text-[96px] font-gistesy text-dark",
    },
  },
  defaultVariants: {
    size: "body",
  },
});
