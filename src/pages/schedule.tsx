import superjson from "superjson";
import { createServerSideHelpers } from "@trpc/react-query/server";

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
      <div className="w-full">
        <div className="container mx-auto mt-20 mb-12 flex max-w-3xl flex-col items-center justify-center ">
          <p className="max-w-[12ch] text-center font-gistesy text-5xl text-brown md:max-w-lg md:text-7xl">
            We're getting married!
          </p>
          <p className="color-text font-cardo text-lg lowercase md:text-xl">
            and you're invited to celebrate with us!
          </p>

          {personDetails.data?.rsvped ? (
            <div>
              <p>Thank you for RSVPing!</p>
            </div>
          ) : (
            <div className="mt-16 text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-white px-4 py-2">RSVP Here</button>
                </DialogTrigger>
                <DialogContent>
                  <FormRSVP />
                </DialogContent>
              </Dialog>
              <p className="mt-3">Please RSVP by August 4th</p>
            </div>
          )}
        </div>
      </div>

      <div className="my-16 flex flex-col items-center justify-center">
        <p>Schedule</p>
        <p>Saturday November 4th, 2023</p>
        <ButtonAddToCalendar />
      </div>

      <div className="my-8 flex flex-col items-center justify-center gap-2 text-center">
        <div className="max-w-xl">
          <p>Ceremony</p>
          <p>12:45pm - 2:30pm</p>
          <p>
            Please arrive and be seated by 12:45pm for a 1:00pm start. Children
            are welcome.
          </p>
        </div>
        <div className="max-w-xl">
          <p>Social Hover</p>
          <p>2:30pm - 4:00pm</p>
          <p>
            After the ceremony and photos, please join us for light refreshments
            in the Parish Hall next to the church.
          </p>
        </div>
        {personDetails.data?.access === "Reception" && (
          <div className="max-w-xl">
            <p>Reception</p>
            <p>7:00pm - 12:00am</p>
            <p>
              Please arrive and be seated by 12:45pm for a 1:00pm start.
              Children are welcome.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ButtonAddToCalendar = () => {
  return (
    <button
      onClick={() => {
        const event = {
          title: "Wedding",
          description: "Andrew + Tina",
          location: "Melbourne, Australia",
          start: "2023-11-04T17:00:00+11:00",
          end: "2023-11-04T23:00:00+11:00",
        };
        const calendar = window.open(
          `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.title}&dates=${event.start}/${event.end}&details=${event.description}&location=${event.location}&sf=true&output=xml`
        );

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
    ctx: createInnerTRPCContext({ req: context.req, res: context.res }),
    transformer: superjson,
  });
  const person = context.query?.person ?? "N/A";

  await helpers.rego.getPerson.prefetch({ person: person as string });

  return {
    props: { person, trpcState: helpers.dehydrate() },
  };
}
