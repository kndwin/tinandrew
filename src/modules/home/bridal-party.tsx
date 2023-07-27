import Image from "next/image";
import { SectionTitle } from "./section-title";
import { twMerge } from "tailwind-merge";

const profile = {
  tina: {
    name: "Tina",
    type: "Bride",
    description:
      "Tina initially thought Andrew would never like her so she pretended that she did not like Andrew. Tina was charmed by Andrew’s earnest love of God and those around him. Tina was initially elusive in the relationship, but has now changed to become the attached one. Tina brings the chaos, home-cooked meals and bad movie taste to the relationship.",
    image: "/profile-tina.svg",
    gender: "boy",
  },
  andrew: {
    name: "Andrew",
    type: "Groom",
    description:
      "Andrew met Tina at church youth group and thought she was pretty cute, though he had no idea of the ride that she would eventually put him through. After 6 years of friendship, 2 years of weird mixed signals, and 2 years of dating, Andrew has decided to lock her down before she goes anywhere. Andrew brings the calm energy, good anime taste, and driving to the relationship.",
    image: "/profile-andrew.svg",
    gender: "boy",
  },
  nathan: {
    name: "Nathan",
    type: "Groomsman",
    description:
      "Andrew’s older brother. Though Andrew loves to rub all his achievements in Nathan’s face as the younger sibling, he remains his source of wisdom in all life stages, and a close brother and friend.",
    image: "/profile-nathan.svg",
    gender: "boy",
  },
  alexBoy: {
    name: "Alex",
    type: "Groomsman",
    description:
      "Andrew met Alex at church, and instantly clicked - since then, they have travelled Japan and Vietnam together, met their future wives, and both grown up to be godly men in Christ. A precious friend.",
    image: "/profile-alex.svg",
    gender: "boy",
  },
  ihsan: {
    name: "Ihsan",
    type: "Groomsman",
    description:
      "Another close friend from church, Ihsan is source of encouragement and good vibes, and has been there for many of Andrew’s life struggles and milestones. An absolute fiend on and off the Rift.",
    image: "/profile-ihsan.svg",
    gender: "boy",
  },
  jess: {
    name: "Jess",
    type: "Bridesmaid",
    description:
      "Tina’s friend from high school and one of her closest Christian sisters. Jess sharpens Tina’s mind whilst also allowing Tina to feel free to act like an absolute monkey.",
    image: "/profile-jess.svg",
    gender: "girl",
  },
  alexGirl: {
    name: "Alex",
    type: "Bridesmaid",
    description:
      "Tina met Alex in university, where they became inseparable (and a public nuisance). From 4am assignments to soothing a Tina in distress; Alex is always there for Tina.",
    image: "/profile-alex-girl.svg",
    gender: "girl",
  },
  saranda: {
    name: "Saranda",
    type: "Bridesmaid",
    description:
      "Saranda and Tina met in high school, creating core childhood memories and facing life’s troubles together.  A friendship that has overcome more trials than Tina and Andrew ever will. ",
    image: "/profile-saranda.svg",
    gender: "girl",
  },
};

export const BridalParty = () => {
  return (
    <section
      id="bridal-party"
      className="relative my-8 flex w-full flex-col items-center px-8 pt-[36px] lg:px-12"
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
        <div className="flex flex-col items-start gap-0 sm:flex-row sm:items-center sm:gap-4">
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
