import { FormRSVP } from "~/modules/rsvp";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

export const Hero = ({ rsvped }: { rsvped: boolean }) => {
  return (
    <section id="rsvp" className="relative flex w-full flex-col items-center">
      <div className="mx-auto flex h-fit flex-col items-center justify-center pt-40 pb-8 md:min-h-screen md:p-0">
        <Image src="/hero-kittens.png" alt="Cat" height={70} width={175} />
        <p className="w-full text-center font-gistesy text-5xl text-brown sm:max-w-none sm:text-[120px]">
          {`We're getting married!`}
        </p>
        <p className="color-text mt-4 text-center font-cardo text-[32px] font-light lowercase md:text-xl">
          {`and you're invited to celebrate with us!`}
        </p>

        {!rsvped && (
          <div className="mt-16 text-center">
            <FormRSVP />
            <p className="mt-3 text-sm text-lightbrown">
              Please RSVP by August 4th
            </p>
          </div>
        )}
      </div>
      <ImageSection />
    </section>
  );
};

const ImageSection = () => {
  const ref = useRef(null);

  const polaroidImageProps = useMemo(
    () => ({
      drag: true,
      dragConstraints: ref,
      whileDrag: {
        z: 10,
        scale: 1.1,
        zIndex: 10,
        transition: { duration: 1 },
      },
      transition: {
        duration: 10, // Total duration in seconds
        ease: "linear", // Easing function for smooth animation
        loop: Infinity, // Loop the animation infinitely
      },
    }),
    [ref]
  );
  return (
    <section
      ref={ref}
      className="relative flex h-fit w-full py-8 px-4 md:min-h-screen md:p-0"
    >
      <AnimatedImage
        {...polaroidImageProps}
        layout="size"
        src="/polaroid-tl.png"
        className="absolute hidden md:block"
        style={{
          top: "calc(50% - 350px)",
          left: "calc(50% - 600px)",
        }}
        height={450}
        width={300}
        animate={{
          x: [0, 20, 0, -20, 0], // X-axis movement in pixels
          y: [0, -20, 0, 20, 0], // Y-axis movement in pixels
        }}
        alt="Image Polaroid"
      />
      <AnimatedImage
        {...polaroidImageProps}
        style={{
          top: "calc(50% - 300px)",
          left: "calc(50% + 300px)",
        }}
        layout="size"
        src="/polaroid-tr.png"
        className="absolute hidden md:block"
        height={480}
        width={300}
        animate={{
          x: [0, 20, 0, 20, 0], // X-axis movement in pixels
          y: [0, 20, 0, 20, 0], // Y-axis movement in pixels
        }}
        alt="Image Polaroid"
      />
      <AnimatedImage
        {...polaroidImageProps}
        layout="size"
        src="/polaroid-c.png"
        className="block h-full w-full md:absolute md:h-[600px] md:w-[600px]"
        alt="Image Polaroid"
        style={{
          top: "calc(50% - 300px)",
          left: "calc(50% - 300px)",
        }}
        height={600}
        width={600}
      />
      <AnimatedImage
        {...polaroidImageProps}
        className="absolute hidden md:block"
        style={{
          top: "calc(50%)",
          left: "calc(50% - 550px)",
        }}
        layout="size"
        src="/polaroid-bl.png"
        height={450}
        width={300}
        animate={{
          x: [0, 20, 0, -20, 0], // X-axis movement in pixels
          y: [0, 20, 0, -20, 0], // Y-axis movement in pixels
        }}
        alt="Image Polaroid"
      />
      <AnimatedImage
        {...polaroidImageProps}
        className="absolute hidden md:block"
        style={{
          top: "calc(50%)",
          left: "calc(50% + 250px)",
        }}
        layout="size"
        src="/polaroid-br.png"
        height={400}
        width={450}
        animate={{
          x: [0, 20, 0, -20, 0], // X-axis movement in pixels
          y: [0, -20, 0, 20, 0], // Y-axis movement in pixels
        }}
        alt="Image Polaroid"
      />
      <Image
        src="/branch-tr.png"
        alt="Branch top right"
        className="absolute top-0 right-0 hidden md:block"
        height={230}
        width={120}
      />
      <Image
        src="/branch-bl.png"
        alt="Branch bottom left"
        className="absolute bottom-0 left-0 hidden md:block"
        height={230}
        width={110}
      />
    </section>
  );
};

const AnimatedImage = motion(Image);
