import Image from "next/image";
import { SectionTitle } from "./section-title";
import { Text } from "~/ui";

const questionsAndAnswers = {
  rsvp: {
    title: "RSVP",
    description: "Please RSVP by 30th September 2021",
  },
  children: {
    title: "Children and +1's",
    description:
      "We love children, but due to limited space, we are unable to accommodate children at the reception. We hope you understand.",
  },
  gifts: {
    title: "Gifts",
    description:
      "Your presence is the best gift we could ask for. If you would like to give a gift, we have a wishing well set up at the reception.",
  },
  contact: {
    title: "How to contact us",
    description:
      "If you have any questions, please contact us at: <a href='mailto:",
  },
};

export const QuestionsAndAnswers = () => {
  return (
    <section
      id="q-and-a"
      className="relative my-8 flex w-full flex-col items-center pt-[32px]"
    >
      <SectionTitle title="Q + A" />

      <div className="flex max-w-[40ch] flex-col items-center gap-7 px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <Text size="subheading" className="text-brown">
            {questionsAndAnswers.rsvp.title}
          </Text>
          <Text>{questionsAndAnswers.rsvp.description}</Text>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Text size="subheading" className="text-brown">
            {questionsAndAnswers.children.title}
          </Text>
          <Text>{questionsAndAnswers.children.description}</Text>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Text size="subheading" className="text-brown">
            {questionsAndAnswers.gifts.title}
          </Text>
          <Text>{questionsAndAnswers.gifts.description}</Text>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Text size="subheading" className="text-brown">
            {questionsAndAnswers.contact.title}
          </Text>
          <Text>{questionsAndAnswers.contact.description}</Text>
        </div>
      </div>

      <Image
        className="absolute right-0 top-0 -z-10 hidden sm:block"
        src="/hero-polaroids-b.png"
        height={500}
        width={250}
        alt="Image Polaroid"
      />
      <Image
        className="absolute -left-8 top-full -z-10 hidden -translate-y-full -rotate-12 sm:block"
        src="/hero-polaroids-a.png"
        height={600}
        width={300}
        alt="Image Polaroid"
      />
    </section>
  );
};
