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

import { Hero } from "~/modules/home/hero";
import { AddToCalendar } from "~/modules/home/add-to-calendar";
import { SectionTitle } from "~/modules/home/section-title";
import { Timeline } from "~/modules/home/timeline";
import { Location } from "~/modules/home/location";
import { QuestionsAndAnswers } from "~/modules/home/question-and-answers";
import { BridalParty } from "~/modules/home/bridal-party";
import { AboutUs } from "~/modules/home/about-us";

const usePersonDetails = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const personDetails = api.rego.getPerson.useQuery(
    {
      person: props.person as string,
    },
    {
      onSuccess: (data) => {
        if (!Boolean(data?.person)) {
          router.push("/");
        }
      },
    }
  );
  return personDetails;
};

const Schedule: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const personDetails = usePersonDetails(props);
  const access =
    personDetails?.data?.access === "Reception" ? "reception" : "ceremony";

  return (
    <div className="flex h-full flex-col">
      <Hero rsvped={personDetails.data?.rsvped} />
      <SectionTitle title="Schedule" />
      <AddToCalendar />
      <Timeline access={access} />
      <Location access={access} />
      <QuestionsAndAnswers />
      <BridalParty />
      <AboutUs />
    </div>
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
