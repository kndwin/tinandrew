import superjson from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";
import Image from "next/image";

import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext,
} from "next";

import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Dialog, DialogContent, DialogTrigger } from "~/ui";
import { FormRSVP } from "~/modules/rsvp";
import { Grid } from "lucide-react";
import { time } from "console";

const Schedule: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const personDetails = api.rego.getPerson.useQuery(
    {
      person: props.person as string,
    },
    {
      onSuccess: (data) => {
        if (!Boolean(data.person)) {
          router.push("/");
        }
      },
    }
  );

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex w-full flex-col items-center">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center pt-16">
          <Image src="/hero-kittens.png" alt="Cat" height={70} width={175} />
          <p className="max-w-[12ch] text-center font-gistesy text-5xl text-brown md:max-w-lg md:text-7xl">
            {`We're getting married!`}
          </p>
          <p className="color-text text-center font-cardo text-lg font-light lowercase md:text-xl">
            {`and you're invited to celebrate with us!`}
          </p>

          {personDetails.data?.rsvped ? (
            <div>
              <p>Thank you for RSVPing!</p>
            </div>
          ) : (
            <div className="mt-16 text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="rounded-sm border-2 border-brown bg-white px-4 py-2 text-brown">
                    RSVP Here
                  </button>
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
          <Image
            className="-z-10 block h-1/2 sm:hidden"
            src="/hero-polaroids-c.png"
            height={650}
            width={478}
            alt="Image Polaroid"
          />
        </div>
        <Image
          className="absolute left-0 top-0 -z-10 hidden sm:block"
          src="/hero-polaroids-a.png"
          height={800}
          width={500}
          alt="Image Polaroid"
        />
        <Image
          className="absolute right-0 top-0 -z-10 hidden sm:block"
          src="/hero-polaroids-b.png"
          height={800}
          width={500}
          alt="Image Polaroid"
        />
      </div>

      <div className="my-16 flex flex-col items-center justify-center">
        <p className="font-gistesy text-5xl text-brown ">Schedule</p>
        <Image
          src="/timeline-flowers.png"
          className="w-24"
          height={800}
          width={500}
          alt="Flower"
        />
        <p className="mt-8 text-center font-cardo text-3xl text-lightbrown">
          Saturday November 4th, 2023
        </p>
        <ButtonAddToCalendar />
      </div>

      <Timeline
        version={
          personDetails?.data?.access === "Reception" ? "reception" : "ceremony"
        }
      />
    </div>
  );
};

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
    description:
      "Please arrive and be seated by 12:45pm for a 1:00pm start. Children are welcome.",
    imgSrc: "/timeline-ring.png",
    imgAlt: "Wedding Ring",
  },
  socialHover: {
    title: "Social Hover",
    time: "2:30pm - 4:00pm",
    description:
      "After the ceremony and photos, please join us for light refreshments in the Parish Hall next to the church.",
    imgSrc: "/timeline-cake.png",
    imgAlt: "Wedding Cake",
  },
  reception: {
    title: "Reception",
    time: "7:00pm - 12:00pm",
    description:
      "Please arrive and be seated by 12:45pm for a 1:00pm start. Children are welcome.",
    imgSrc: "/timeline-steak.png",
    imgAlt: "Wedding Steak",
  },
};

const GridItem = (props: Timeline & { align: "left" | "right" }) => (
  <>
    {props.align == "left" && (
      <>
        <Image
          src={props.imgSrc}
          className="w-24 self-center justify-self-end"
          height={100}
          width={100}
          alt={props.imgAlt}
        />
        <div className="p-4 text-left">
          <p className="font-cardo text-xl text-brown">{props.title}</p>
          <p className="font-karla text-lightbrown">{props.time}</p>
          <p className="font-karla text-sm">{props.description}</p>
        </div>
      </>
    )}
    {props.align == "right" && (
      <>
        <div className="p-4 text-right">
          <p className="font-cardo text-xl text-brown">{props.title}</p>
          <p className="font-karla text-lightbrown">{props.time}</p>
          <p className="font-karla text-sm">{props.description}</p>
        </div>
        <Image
          src={props.imgSrc}
          className="w-24 self-center"
          height={100}
          width={100}
          alt={props.imgAlt}
        />
      </>
    )}
  </>
);

const MobileItem = (props: Timeline) => (
  <div className="flex w-full max-w-[30ch] flex-col items-center text-center">
    <Image
      src={props.imgSrc}
      className="w-24 self-center"
      height={100}
      width={100}
      alt={props.imgAlt}
    />
    <p className="font-cardo text-xl text-brown">{props.title}</p>
    <p className="font-karla text-lightbrown">{props.time}</p>
    <p className="font-karla text-sm">{props.description}</p>
  </div>
);

const Timeline = ({ version }: { version: "reception" | "ceremony" }) => {
  return (
    <div className="my-8 flex flex-col items-center justify-center gap-2">
      <div className="hidden max-w-[70ch] grid-cols-[1fr_2em_1fr] gap-y-4 gap-x-2 sm:grid">
        <div className="col-start-2 col-end-2 row-span-3 row-start-1 my-auto flex h-4/5 flex-col">
          {version === "ceremony" ? (
            <>
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
              <div className="mx-auto h-4/5 w-[3px] bg-brown" />
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
            </>
          ) : (
            <>
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
              <div className="mx-auto h-2/5 w-[3px] bg-brown" />
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
              <div className="mx-auto h-2/5 w-[3px] bg-brown" />
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
            </>
          )}
        </div>
        <GridItem {...timeline["ceremony"]} align="right" />
        <GridItem {...timeline["socialHover"]} align="left" />
        {version === "reception" && (
          <GridItem {...timeline["reception"]} align="right" />
        )}
      </div>
      <div className="flex flex-col gap-4 sm:hidden">
        <MobileItem {...timeline["ceremony"]} />
        <MobileItem {...timeline["socialHover"]} />
        {version === "reception" && <MobileItem {...timeline["reception"]} />}
      </div>
    </div>
  );
};

const ButtonAddToCalendar = () => {
  return (
    <button
      className="mt-2 rounded-full border border-lightbrown bg-white px-3 py-1 text-xs text-lightbrown"
      onClick={() => {
        const event = {
          title: "Wedding",
          description: "Andrew + Tina",
          location: "Melbourne, Australia",
          start: "2023-11-04T17:00:00+11:00",
          end: "2023-11-04T23:00:00+11:00",
        };
        const url = new URL("https://calendar.google.com/calendar/render");
        url.searchParams.set("action", "TEMPLATE");
        url.searchParams.set("text", event.title);
        url.searchParams.set("dates", `${event.start}/${event.end}`);
        url.searchParams.set("details", event.description);
        url.searchParams.set("location", event.location);
        url.searchParams.set("sf", "true");
        url.searchParams.set("output", "xml");

        const calendar = window.open(url.toString());

        calendar?.document?.close();
        calendar?.focus();
      }}
    >
      + Add to calendar
    </button>
  );
};

export default Schedule;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ person: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    // @ts-expect-error: TODO
    ctx: createInnerTRPCContext({ req: context.req, res: context.res }),
    transformer: superjson,
  });
  const person = context.query?.person ?? "N/A";

  await helpers.rego.getPerson.prefetch({ person: person as string });

  return {
    props: { person, trpcState: helpers.dehydrate() },
  };
}
