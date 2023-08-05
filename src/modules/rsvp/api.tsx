import { Client } from "@notionhq/client";
import { Resend } from "resend";
import { type z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createRSVPSchema } from "~/modules/rsvp";
import ConfirmRSVP from "emails/confirm-rsvp";

const resend = new Resend(process.env.RESEND_API_KEY);
const client = new Client({ auth: process.env.NOTION_SECRET_TOKEN });

const ID = {
  ResponseDatabase: "b14270df030b4c39859312a1c79a6c31",
};

export const rsvpRouter = createTRPCRouter({
  createRSVP: publicProcedure
    .input(createRSVPSchema)
    .mutation(async ({ input }) => {
      const res = await client.databases.query({
        database_id: ID.ResponseDatabase,
        filter: { property: "Person", title: { contains: input.person } },
      });

      const user = res?.results?.[0] as any;
      const pageId = user?.id as string;
      const updatedRow = await updateRow(pageId, input);

      const isAtteningBoth =
        input.attending === "Yes" && input.attendingReception === "Yes";
      const isAttendingCeremony =
        input.attending === "Yes" && input.attendingReception === "No";
      const isAttendingReception =
        input.attending === "No" && input.attendingReception === "Yes";

      let type = "not-attending";
      if (isAtteningBoth) {
        type = "ceremony-reception";
      } else if (isAttendingCeremony) {
        type = "ceremony";
      } else if (isAttendingReception) {
        type = "reception";
      }

      const data = await resend.sendEmail({
        from: "Tina and Andrew<rsvp@andrewtina.com>",
        to: user.properties.Email.email,
        subject: "Tina and Andrew's Wedding RSVP",
        react: ConfirmRSVP({ name: input.person, type }),
      });

      console.log(JSON.stringify(data, null, 2));

      return {
        updatedRow,
      };
    }),
});

type CreateRVSPProps = z.infer<typeof createRSVPSchema>;

const updateRow = async (id: string, input: CreateRVSPProps) => {
  const updatedRow = await client.pages.update({
    page_id: id,
    properties: {
      "Not attending ceremony": {
        checkbox: input.attendingReception === "No",
      },
      "Plus One": {
        checkbox: input.plusOne === "Yes",
      },
      RSVPed: {
        checkbox: true,
      },
      Attending: {
        select: {
          name: input.attending,
        },
      },
      QnA: {
        rich_text: [{ text: { content: input.qna } }],
      },
      Dietary: {
        rich_text: [{ text: { content: input.allergies } }],
      },
    },
  });

  return updatedRow;
};
