import { Client } from "@notionhq/client";

export const client = new Client({ auth: process.env.NOTION_SECRET_TOKEN });
export const ID = {
  ResponseDatabase: "b14270df030b4c39859312a1c79a6c31",
};
