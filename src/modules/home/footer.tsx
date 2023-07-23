import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useInterval } from "~/hooks";
import { format, subSeconds } from "date-fns";

export const Footer = () => {
  return (
    <div className="flex w-screen flex-col items-center gap-10">
      <Image
        alt="Tina and Andrew 3 polaroids"
        className="w-screen md:hidden"
        src="/footer-polaroid-single.png"
        width={604}
        height={622}
      />
      <Image
        alt="Tina and Andrew 3 polaroids"
        className="hidden w-screen md:block"
        src="/footer-polaroid@2.png"
        width={1440}
        height={961}
      />
      <p className="font-cardo text-[48px] font-light text-brown">
        Special thanks to
      </p>
      <div className="grid grid-cols-1 gap-y-10 text-center sm:grid-cols-[15em_1fr] sm:text-left">
        <p className="font-cardo text-[32px] text-brown">Photography:</p>
        <p className="font-cardo text-[32px] font-bold text-brown">Ceana Lee</p>
        <p className="font-cardo text-[32px] text-brown">Website</p>
        <p className="font-cardo text-[32px] font-bold text-brown">
          Kevin Nguyen
        </p>
      </div>
      <div className="text-center">
        <p className="mt-40 font-gistesy text-[96px] text-brown">
          See you guys in
        </p>
        <Countdown />
      </div>

      <Image
        alt="Tina and Andrew walking down a garden"
        className="mt-32 w-screen"
        src="/footer.png"
        width={1440}
        height={961}
      />
    </div>
  );
};

const CeremonyDate = new Date("2023-11-04T01:45:00");

const Countdown = () => {
  const [now, setNow] = useState(Date.now());
  const interval = useInterval(() => {
    setNow(Date.now());
  }, 1_000);

  useEffect(() => {
    interval.start();
    return interval.stop();
  }, []);

  // convert ms to seconds
  const remaining = useMemo(
    () => Math.floor((CeremonyDate.valueOf() - now) / 1000),
    [now]
  );
  return (
    <p className="font-karla text-[48px] font-bold text-brown">
      {formatRemaining(remaining)}
    </p>
  );
};

// convert a remaining epoch to the following format X days X hours X minutes X seconds left in date-fns format
const formatRemaining = (remaining: number) => {
  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  // const seconds = Math.floor(remaining % 60);
  return `${days} days ${hours} hours ${minutes} minutes`;
};
