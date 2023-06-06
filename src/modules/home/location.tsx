import Image from "next/image";
import { SectionTitle } from "./section-title";

export const Location = () => {
  return (
    <section className="relative my-8 flex w-full flex-col items-center">
      <SectionTitle title="Location" />

      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <div className="flex w-full flex-col gap-6 px-4 sm:flex-row sm:justify-center">
          <div className="h-[12em] w-full bg-gray-200 sm:w-2/5" />
          <div className="text-left sm:w-3/5">
            <p className="font-cardo text-3xl font-light text-brown">
              {location.ceremony.title}
            </p>
            <p className="font-karla text-lightbrown">
              {location.ceremony.address}
            </p>
            <p className="font-karla text-sm">
              Onsite parking will not be available for guests attending the
              ceremony We recommend parking at Westfields Parramatta (4 hours
              free for plus members)  or catching the train to Parramatta
              Station.  Both are a 5-minute walk to the church.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 px-4 sm:flex-row sm:justify-center">
          <div className="h-[12em] w-full bg-gray-200 sm:w-2/5" />
          <div className="text-left sm:w-3/5">
            <p className="font-cardo text-3xl font-light text-brown">
              {location.reception.title}
            </p>
            <p className="font-karla text-lightbrown">
              {location.reception.address}
            </p>
            <p className="font-karla text-sm">
              {location.reception.description}
            </p>
          </div>
        </div>
      </div>

      <Image
        style={{ transform: "scaleX(-1)" }}
        className="absolute left-0 top-0 -z-10 hidden sm:block"
        src="/hero-polaroids-b.png"
        height={500}
        width={250}
        alt="Image Polaroid"
      />
    </section>
  );
};

const location = {
  ceremony: {
    title: "Ceremony",
    address:
      "St Johns Anglican Cathedral, Parramatta 195 Church St, Parramatta NSW 2150",
  },
  reception: {
    title: "Reception",
    address: "Epping Club 45-47 Rawson St, Epping NSW 2121",
    description:
      "Limited on-site parking will be available for guests attending the reception We also recommend catching the train to Epping Station, which is a 5-minute walk to the church.",
  },
};
