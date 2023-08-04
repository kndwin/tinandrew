import { CopyIcon } from "lucide-react";
import { SectionTitle } from "./section-title";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip";
import { useState } from "react";
import { FormRSVP } from "../rsvp";

const questionsAndAnswers = {
  rsvp: {
    title: "RSVP",
    description:
      "Please let us know if your coming as soon as possible. The deadline is the 16th of September 2023. If you would like to edit your RSVP, click: ",
  },
  children: {
    title: "Children and +1's",
    description:
      "Children and +1’s are welcome to the ceremony. Unfortunately however we will be unable to accommodate for them for the reception.",
  },
  gifts: {
    title: "Gifts",
    description: `If you would like to give us a gift - first of all, thank you! We would prefer a monetary gift. We will have a wishing well on the day as well.`,
  },
  contact: {
    title: "How to contact us",
    description:
      "For anything else, reach out to us at andrewtinaxing@gmail.com! Or message/call us at 0435594333.",
  },
};

export const QuestionsAndAnswers = ({
  access,
}: {
  access: "ceremony" | "reception";
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  return (
    <section
      id="q-and-a"
      className="relative my-8 flex w-full flex-col items-center pt-[32px]"
    >
      <SectionTitle title="Q + A" />

      <div className="flex w-full max-w-[60ch] flex-col items-center gap-10 px-4 text-left">
        <div className="flex w-full flex-col gap-3">
          <p className="font-cardo text-[32px] text-brown">
            {questionsAndAnswers.rsvp.title}
          </p>
          <p className="font-karla text-[20x]">
            {questionsAndAnswers.rsvp.description}
            <FormRSVP
              access={access}
              trigger={
                <a className="cursor-pointer font-bold text-brown">
                  Change Details
                </a>
              }
            />
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <p className="font-cardo text-[32px] text-brown">
            {questionsAndAnswers.children.title}
          </p>
          <p className="font-karla text-[20x]">
            {questionsAndAnswers.children.description}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <p className="font-cardo text-[32px] text-brown">
            {questionsAndAnswers.gifts.title}
          </p>
          <p className="whitespace-pre-line font-karla text-[20x]">
            {questionsAndAnswers.gifts.description}
          </p>
          <div className="text-karla relative flex justify-between whitespace-pre-line rounded-lg border border-cream p-4 font-karla">
            <p>{`Andrew and Tina (BSB: 670-864 - Acc: 2347 2813)`}</p>

            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <button
                className="w-fit"
                onClick={() => {
                  navigator.clipboard.writeText("670-864 - 2347 2813");
                  setTooltipOpen(true);
                }}
              >
                <CopyIcon className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brown" />
              </button>
              <TooltipTrigger />
              <TooltipContent>{`Copied!`}</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <p className="font-cardo text-[32px] text-brown">
            {questionsAndAnswers.contact.title}
          </p>
          <p className="font-karla text-[20x]">
            {questionsAndAnswers.contact.description}
          </p>
        </div>
      </div>
    </section>
  );
};
