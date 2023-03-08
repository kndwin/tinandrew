import sendgrid from "@sendgrid/mail";
import { Client } from "@notionhq/client";
import { type z } from "zod";
import { render } from "@react-email/render";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { createRSVPSchema } from "~/pages";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

const client = new Client({ auth: process.env.NOTION_SECRET_TOKEN });
const ID = {
  ResponseDatabase: "b14270df030b4c39859312a1c79a6c31",
};

export const notionRouter = createTRPCRouter({
  createRSVP: publicProcedure
    .input(createRSVPSchema)
    .mutation(async ({ input }) => {
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
  const updatedRow = await client.pages.create({
    parent: {
      type: "database_id",
      database_id: ID.ResponseDatabase,
    },
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
      Allergies: {
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
