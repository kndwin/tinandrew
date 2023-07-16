import { Dialog, DialogContent, DialogTrigger } from "~/ui";
import { FormRSVP } from "~/modules/rsvp";
import Image from "next/image";
import { button } from "~/ui/button";
import { motion } from "framer-motion";
import { ComponentProps, useMemo, useRef } from "react";

export const Hero = ({ rsvped }: { rsvped: boolean }) => {
  return (
    <section id="rsvp" className="relative flex w-full flex-col items-center">
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center">
        <Image src="/hero-kittens.png" alt="Cat" height={70} width={175} />
        <p className="w-full text-center font-gistesy text-5xl text-brown sm:max-w-none sm:text-[120px]">
          {`We're getting married!`}
        </p>
        <p className="color-text mt-4 text-center font-cardo text-[32px] font-light lowercase md:text-xl">
          {`and you're invited to celebrate with us!`}
        </p>

        {!rsvped && (
          <div className="mt-16 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className={button()}>RSVP Here</button>
              </DialogTrigger>
              <DialogContent>
                <FormRSVP />
              </DialogContent>
            </Dialog>
            <p className="mt-3 text-sm text-lightbrown">
              Please RSVP by August 4th
            </p>
          </div>
        )}
        <div className="relative -z-10 block h-[30em] w-[20em] sm:hidden">
          <Image
            src="/hero-polaroids-c.svg"
            layout="fill"
            objectFit="cover"
            alt="Image Polaroid"
          />
        </div>
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
    <section ref={ref} className="relative flex min-h-screen w-full">
      <AnimatedImage
        {...polaroidImageProps}
        layout="size"
        src="/polaroid-tl.png"
        style={{
          position: "absolute",
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
          position: "absolute",
          top: "calc(50% - 300px)",
          left: "calc(50% + 300px)",
        }}
        layout="size"
        src="/polaroid-tr.png"
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
        alt="Image Polaroid"
        style={{
          position: "absolute",
          top: "calc(50% - 300px)",
          left: "calc(50% - 300px)",
        }}
        height={600}
        width={600}
      />
      <AnimatedImage
        {...polaroidImageProps}
        style={{
          position: "absolute",
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
        style={{
          position: "absolute",
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
        className="absolute top-0 right-0"
        height={460}
        width={250}
      />
      <Image
        src="/branch-bl.png"
        alt="Branch bottom left"
        className="absolute bottom-0 left-0"
        height={460}
        width={220}
      />
    </section>
  );
};

const AnimatedImage = motion(Image);
