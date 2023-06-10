import Image from "next/image";
import { SectionTitle } from "./section-title";
import { Text } from "~/ui";

const aboutUs = {
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

export const AboutUs = () => {
  return (
    <section className="relative mt-8 mb-20 flex w-full flex-col items-center">
      <SectionTitle title="About us" />

      <div className="flex max-w-[40ch] flex-col items-center gap-7 px-4 text-center">
        <div className="flex flex-col items-center gap-3">
          <Text size="subheading" className="text-brown">
            {aboutUs.rsvp.title}
          </Text>
          <Text>{aboutUs.rsvp.description}</Text>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Text size="subheading" className="text-brown">
            {aboutUs.children.title}
          </Text>
          <Text>{aboutUs.children.description}</Text>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Text size="subheading" className="text-brown">
            {aboutUs.gifts.title}
          </Text>
          <Text>{aboutUs.gifts.description}</Text>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Text size="subheading" className="text-brown">
            {aboutUs.contact.title}
          </Text>
          <Text>{aboutUs.contact.description}</Text>
        </div>
      </div>
    </section>
  );
};
