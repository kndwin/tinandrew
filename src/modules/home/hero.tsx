import { Dialog, DialogContent, DialogTrigger } from "~/ui";
import { FormRSVP } from "~/modules/rsvp";
import Image from "next/image";
import { cx } from "class-variance-authority";
import { button } from "~/ui/button";

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
      <Image
        className="absolute left-0 top-1/2 -z-10 hidden -translate-y-1/2 sm:block"
        src="/hero-polaroids-a.png"
        height={600}
        width={300}
        alt="Image Polaroid"
      />
      <Image
        className="absolute right-0 top-1/2 -z-10 hidden -translate-y-1/2 sm:block"
        src="/hero-polaroids-b.png"
        height={600}
        width={300}
        alt="Image Polaroid"
      />
    </section>
  );
};
