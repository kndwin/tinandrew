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

import { NavBar } from "~/modules/home/nav-bar";
import { Hero } from "~/modules/home/hero";
import { Timeline } from "~/modules/home/timeline";
import { QuestionsAndAnswers } from "~/modules/home/question-and-answers";
import { BridalParty } from "~/modules/home/bridal-party";
import { AboutUs } from "~/modules/home/about-us";

const usePersonDetails = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const personDetails = api.rego.getPerson.useQuery(
    { person: props.person as string },
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
      <NavBar />
      <div className="z-0 flex h-full flex-col">
        <Hero
          rsvped={personDetails.data?.rsvped}
          attending={personDetails.data?.attending}
        />
        <Timeline access={access} />
        <QuestionsAndAnswers />
        <BridalParty />
        <AboutUs />
      </div>
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
