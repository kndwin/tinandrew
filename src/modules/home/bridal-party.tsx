import Image from "next/image";
import { SectionTitle } from "./section-title";
import { Text } from "~/ui";
import { twMerge } from "tailwind-merge";

const profile = {
  tina: {
    name: "Tina",
    type: "Bride",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Tina was initially elusive in the relationship, but has now changed to become the attached one. Tina brings the chaos, home-cooked meals and bad movie taste to the relationship.",
    image: "/profile-tina.svg",
    gender: "boy",
  },
  andrew: {
    name: "Andrew",
    type: "Groom",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Nathan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-andrew.svg",
    gender: "boy",
  },
  nathan: {
    name: "Nathan",
    type: "Groomsman",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Nathan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-nathan.svg",
    gender: "boy",
  },
  alexBoy: {
    name: "Alex",
    type: "Groomsman",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Alex is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-alex.svg",
    gender: "boy",
  },
  ihsan: {
    name: "Ihsan",
    type: "Groomsman",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Ihsan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-ihsan.svg",
    gender: "boy",
  },
  jess: {
    name: "Jess",
    type: "Bridesmaid",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Nathan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-jess.svg",
    gender: "girl",
  },
  alexGirl: {
    name: "Alex",
    type: "Bridesmaid",
    funFact: "Fact 1, Fact 2, Fact 3",
    description:
      "Nathan is a software engineer at Google. He enjoys playing video games, watching movies, and spending time with his family.",
    image: "/profile-alex-girl.svg",
    gender: "girl",
  },
  saranda: {
    name: "Saranda",
    type: "Bridesmaid",
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
      className="relative my-8 flex w-full flex-col items-center px-4 pt-[36px] lg:px-12"
    >
      <SectionTitle title="Bridal Party" />
      <div className="grid max-w-7xl grid-cols-1 gap-20 border-b border-cream pb-10 lg:grid-cols-2">
        <MainProfile {...profile.andrew} />
        <MainProfile {...profile.tina} />
      </div>
      <div className="mx-4 mt-10 grid max-w-7xl grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
        <Profile {...profile.nathan} />
        <Profile {...profile.jess} />
        <Profile {...profile.alexBoy} />
        <Profile {...profile.alexGirl} />
        <Profile {...profile.ihsan} />
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
  type: string;
};

function MainProfile(props: ProfileProps) {
  return (
    <div className="flex flex-col">
      <div className="relative mx-auto h-80 w-80">
        <Image src={props.image} layout="fill" alt={`${props.name} profile`} />
      </div>
      <div className="flex items-center gap-4">
        <p className="font-cardo text-[32px] font-extralight text-brown">
          {props.name}
        </p>
        <span className="leading rounded-full bg-[#F5EEEB] px-4 font-karla text-[20px] text-brown">
          {props.type}
        </span>
      </div>
      <p className="mt-2 font-karla text-[20px] text-brown">
        {props.description}
      </p>
    </div>
  );
}

function Profile(props: ProfileProps) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-x-8 sm:grid-cols-[160px_1fr] lg:grid-cols-[240px_1fr] lg:gap-8">
      <div className={twMerge("relative h-40 w-24 sm:w-40 lg:h-60 lg:w-60")}>
        <Image src={props.image} layout="fill" alt={`${props.name} profile`} />
      </div>

      <div className="flex w-full flex-col text-left sm:text-left">
        <div className="flex items-center gap-4">
          <p className="font-cardo text-[32px] font-extralight text-brown">
            {props.name}
          </p>
          <span className="leading rounded-full bg-[#F5EEEB] px-4 font-karla text-[20px] text-brown">
            {props.type}
          </span>
        </div>

        <p className="mt-2 font-karla text-[20px] text-brown">
          {props.description}
        </p>
      </div>
    </div>
  );
}
