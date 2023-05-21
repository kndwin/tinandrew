import sendgrid from "@sendgrid/mail";
import { Client } from "@notionhq/client";
import { type z } from "zod";
import { render } from "@react-email/render";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createRSVPSchema } from "~/modules/rsvp";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

const client = new Client({ auth: process.env.NOTION_SECRET_TOKEN });

const ID = {
  ResponseDatabase: "b14270df030b4c39859312a1c79a6c31",
};

export const rsvpRouter = createTRPCRouter({
  createRSVP: publicProcedure
    .input(createRSVPSchema)
    .mutation(async ({ input }) => {
      const doesUserExist = await client.databases.query({
        database_id: ID.ResponseDatabase,
        filter: {
          property: "Person",
          title: {
            contains: `${input.firstName} ${input.lastName}`,
          },
        },
      });
      const updatedRow = await updateRow(input);
      const sentEmail = await sendEmail(input);
      return {
        updatedRow,
        sentEmail,
      };
    }),
});

type CreateRVSPProps = z.infer<typeof createRSVPSchema>;

const updateRow = async (input: CreateRVSPProps) => {
  const updatedRow = await client.pages.update({
    properties: {
      Person: {
        title: [{ text: { content: input.fullName } }],
      },
      Email: {
        email: input.email,
      },
      Attending: {
        select: { name: input.attending },
      },
      Dietary: {
        rich_text: [{ text: { content: input.allergies } }],
      },
    },
  });
  return updatedRow;
};

const sendEmail = async (input: CreateRVSPProps) => {
  const options = {
    from: "tnkevino@gmail.com",
    to: input.email,
    subject: "hello world",
    html: render(<Email input={input} />),
  };

  const sentEmail = await sendgrid.send(options);
  return sentEmail;
};

const Email = ({ input }: { input: CreateRVSPProps }) => {
  return (
    <Html>
      <Button>{input.email}</Button>
    </Html>
  );
};
