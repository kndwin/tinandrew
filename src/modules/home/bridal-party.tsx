import Image from "next/image";
import { SectionTitle } from "./section-title";
import { Text } from "~/ui";
import { twMerge } from "tailwind-merge";

const profile = {
  nathan: {
    name: "Nathan",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Nathan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-nathan.svg",
    gender: "boy",
  },
  alexBoy: {
    name: "Alex",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Alex is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-alex.svg",
    gender: "boy",
  },
  ihsan: {
    name: "Ihsan",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Ihsan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-ihsan.svg",
    gender: "boy",
  },
  jess: {
    name: "Jess",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Nathan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-jess.svg",
    gender: "girl",
  },
  alexGirl: {
    name: "Alex",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Nathan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-alex-girl.svg",
    gender: "girl",
  },
  saranda: {
    name: "Saranda",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Nathan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-saranda.svg",
    gender: "girl",
  },
};

export const BridalParty = () => {
  return (
    <section
      id="bridal-party"
      className="relative my-8 flex w-full flex-col items-center pt-[36px]"
    >
      <SectionTitle title="Bridal Party" />
      <div className="mx-4 flex max-w-xl flex-col gap-12 sm:gap-1">
        <Profile {...profile.nathan} />
        <Profile {...profile.alexBoy} />
        <Profile {...profile.ihsan} />
        <Profile {...profile.jess} />
        <Profile {...profile.alexGirl} />
        <Profile {...profile.saranda} />
      </div>
    </section>
  );
};

type ProfileProps = {
  name: string;
  funFact: string;
  description: string;
  image: string;
  gender: string;
};

function Profile(props: ProfileProps) {
  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row">
      <div
        className={twMerge(
          "relative w-40 sm:h-60 sm:w-60",
          props.gender === "girl" && "h-60",
          props.gender === "boy" && "h-40"
        )}
      >
        <Image
          src={props.image}
          layout="fill"
          objectFit="cover"
          alt={`${props.name} profile`}
        />
      </div>
      <div className="flex w-full flex-col text-center sm:text-left">
        <Text size="heading" className="text-brown">
          {props.name}
        </Text>
        <Text size="subheading" className="text-lightbrown">
          {props.funFact}
        </Text>
        <Text className="max-w-sm text-lightbrown sm:max-w-none">
          {props.description}
        </Text>
      </div>
    </div>
  );
}
