import { SectionTitle } from "./section-title";

const questionsAndAnswers = {
  rsvp: {
    title: "RSVP",
    description: "Please RSVP by 30th September 2021",
  },
  children: {
    title: "Children and +1's",
    description: "Children and +1’s are welcome to the ceremony. ",
  },
  gifts: {
    title: "Gifts",
    description: `If you would like to give us a gift - first of all, thank you! We would prefer a monetary gift. We will have a wishing well on the day as well.\n\nOur bank details:\nAndrew and Tina\nBSB: 670-864\nAcc: 2347 2813`,
  },
  contact: {
    title: "How to contact us",
    description:
      "For anything else, reach out to us at andrewtinaxing@gmail.com! Or message/call us at 0435594333.",
  },
};

export const QuestionsAndAnswers = () => {
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
