import { type SVGProps } from "react";
import { AddToCalendar } from "~/modules/home/add-to-calendar";
import { SectionTitle } from "~/modules/home/section-title";

type Timeline = {
  title: string;
  time: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
};
const timeline = {
  ceremony: {
    title: "Ceremony",
    time: "12:45pm - 2:30pm",
    description: `Please arrive and be seated by 12:45pm for a 1:00pm start. Children are welcome. 
Onsite parking will not be available for guests attending the ceremony. We recommend parking at Westfields Parramatta  (4 hours free for plus members) or catching the train to Parramatta Station. Both are a 5-minute walk to the church. `,
    address: {
      title: "St John's Anglican Cathedral",
      location: "195 Church St, Parramatta NSW 2150, Australia",
      googleUrl: "https://goo.gl/maps/uLHcivFBcfzuVr8f7",
    },
  },
  reception: {
    title: "Reception",
    time: "6:45pm - 12:00am",
    description:
      "Limited on-site parking will be available for guests attending the reception. There is parking in nearby streets and we also recommend catching the train to Epping Station, which is a 5-minute walk to the reception.",
    address: {
      title: "Epping Club",
      location: "45-47 Rawson St, Epping NSW 2121",
      googleUrl: "https://goo.gl/maps/gpmucNuKX7BZ8d9Y6",
    },
  },
};

export const Timeline = ({ access }: { access: "reception" | "ceremony" }) => {
  return (
    <section id="schedule" className="px-4 pt-[32px] sm:px-16">
      <SectionTitle title="Schedule" />
      <p className="mx-auto w-fit border-b border-cream pb-4 text-center font-karla text-[24px] font-medium capitalize text-brown">
        SATURDAY NOVEMBER 4TH, 2023
      </p>
      <div className="mx-auto mt-16 flex w-full max-w-4xl flex-col gap-16">
        <div className="flex flex-col gap-2 border-b border-cream pb-10">
          <div className="mb-[18px] flex flex-col items-start gap-x-4 md:flex-row md:items-center">
            <h2 className="mb-4 font-cardo text-[48px] leading-none text-brown md:mb-0">
              {timeline.ceremony.title}
            </h2>
            <AddToCalendar type="ceremony" />
          </div>

          <div className="grid grid-cols-[20px_1fr] gap-x-8 gap-y-4">
            <ClockIcon className="h-8 w-8" />
            <p className="my-auto font-karla text-[24px] leading-none text-brown">
              {timeline.ceremony.time}
            </p>
            <MarkPinIcon className="h-8 min-h-[32px] w-8" />
            <div className="my-auto w-full">
              <p className="mb-0 font-karla text-[24px] font-medium leading-none text-brown">
                {timeline.ceremony.address.title}
              </p>
              <a
                className="font-karla text-[24px] font-extralight text-brown underline"
                href={timeline.ceremony.address.googleUrl}
                target="_blank"
                rel="noreferrer"
              >
                {timeline.ceremony.address.location}
              </a>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53058.888545853464!2d150.96265947068437!3d-33.781835844907334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a31f886e6107%3A0xd5a88d970a73b40f!2sSt%20John&#39;s%20Anglican%20Cathedral!5e0!3m2!1sen!2sau!4v1690013674230!5m2!1sen!2sau"
            width="100%"
            height={318}
            className="mt-5"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p className="mt-10 whitespace-pre-wrap break-words font-karla text-[20px] font-light leading-[30px] text-dark">
            {timeline.ceremony.description}
          </p>
        </div>
        {access === "reception" && (
          <div className="flex flex-col gap-2 border-b border-cream pb-10">
            <div className="mb-[18px] flex flex-col items-start gap-x-4 md:flex-row md:items-center">
              <h2 className="mb-4 font-cardo text-[48px] leading-none text-brown md:mb-0">
                {timeline.reception.title}
              </h2>
              <AddToCalendar type="reception" />
            </div>

            <div className="grid grid-cols-[20px_1fr] gap-x-8 gap-y-4">
              <ClockIcon className="h-8 w-8" />
              <p className="my-auto font-karla text-[24px] leading-none text-brown">
                {timeline.reception.time}
              </p>
              <MarkPinIcon className="h-8 min-h-[32px] w-8" />
              <div className="my-auto w-full">
                <p className="mb-0 font-karla text-[24px] font-medium leading-none text-brown">
                  {timeline.reception.address.title}
                </p>
                <a
                  className="font-karla text-[24px] font-extralight text-brown underline"
                  href={timeline.reception.address.googleUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {timeline.reception.address.location}
                </a>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5102512086673!2d151.0785641152077!3d-33.773319380682764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a69d4660ea41%3A0xa5ec416785664e4c!2sThe%20Epping%20Club!5e0!3m2!1sen!2sau!4v1690016908385!5m2!1sen!2sau"
              width="100%"
              height={318}
              className="mt-5"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="mt-10 whitespace-pre-wrap break-words font-karla text-[20px] font-light leading-[30px] text-dark">
              {timeline.reception.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={33} height={32} viewBox="0 0 33 32" fill="none" {...props}>
    <path
      stroke="#766156"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M16.5 8v8l5.334 2.666m8-2.667c0 7.364-5.97 13.334-13.334 13.334-7.363 0-13.333-5.97-13.333-13.334 0-7.363 5.97-13.333 13.333-13.333 7.364 0 13.334 5.97 13.334 13.333Z"
    />
  </svg>
);

const MarkPinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 33 32" width={33} height={32} fill="none" {...props}>
    <path
      stroke="#766156"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M16.5 17.333a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
    <path
      stroke="#766156"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M16.5 29.333c5.333-5.334 10.666-10.11 10.666-16 0-5.891-4.775-10.667-10.666-10.667S5.833 7.442 5.833 13.333c0 5.89 5.333 10.666 10.667 16Z"
    />
  </svg>
);
