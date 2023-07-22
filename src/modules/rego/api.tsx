import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ID, client } from "~/server/notion";
import { validateRegoSchema } from ".";

export const regoRouter = createTRPCRouter({
  validateRego: publicProcedure
    .input(validateRegoSchema)
    .mutation(async ({ input }) => {
      if (input.password !== process.env.REGO_PASSWORD) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
      }
      const isPersonValid = await validatePerson(input);
      if (isPersonValid.valid === "invalid") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid person",
        });
      }

      return { ...isPersonValid };
    }),
  getPerson: publicProcedure
    .input(
      z.object({
        person: z.string(),
      })
    )
    .query(async ({ input }) => {
      const person = await client.databases.query({
        database_id: ID.ResponseDatabase,
        filter: {
          property: "Person",
          title: {
            contains: input.person,
          },
        },
      });
      // @ts-expect-error: Notion API is not typed
      return transformNotionPerson(person.results[0]?.properties);
    }),
});

const transformNotionPerson = (person: any) => {
  return {
    person: person?.["Person"]?.title[0]?.plain_text ?? "",
    email: person?.["Email"]?.email ?? "",
    rsvped: person?.["RSVPed"]?.checkbox ?? false,
    access: person?.["Access"]?.select?.name ?? "",
    attending: person?.["Attending"]?.select?.name ?? "",
  };
};

type ValidateRegoProps = z.infer<typeof validateRegoSchema>;

const validatePerson = async (input: ValidateRegoProps) => {
  let valid: "invalid" | "ceremony" | "reception" = "invalid";
  const doesUserExist = await client.databases.query({
    database_id: ID.ResponseDatabase,
    filter: {
      property: "Person",
      title: {
        contains: `${input.firstName} ${input.lastName}`,
      },
    },
  });

  // @ts-expect-error: Notion API is not typed
  const properties = doesUserExist.results[0]?.properties;
  const access = properties?.["Access"]?.select?.name;
  const person = properties?.["Person"]?.title[0]?.plain_text ?? "";

  const isUserInvalid = doesUserExist?.results?.length === 0;

  if (!Boolean(properties?.["Email"]?.email) && !isUserInvalid) {
    await client.pages.update({
      page_id: doesUserExist.results[0]?.id as string,
      properties: {
        Email: {
          type: "email",
          email: input.email,
        },
      },
    });
  }

  if (isUserInvalid) {
    valid = "invalid";
  } else if (access === "Ceremony") {
    valid = "ceremony";
  } else if ("Reception") {
    valid = "reception";
  }

  return { person, valid };
};
