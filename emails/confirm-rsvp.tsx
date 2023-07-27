import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
  Img,
  Link,
} from "@react-email/components";

type ConfirmRSVP = {
  name?: string;
  type: "reception" | "ceremony" | "not-attending";
};

export const ConfirmRSVP = ({
  name = "Kevin Nguyen",
  type = "reception",
}: ConfirmRSVP) => {
  return (
    <Html>
      {type === "reception" && <Reception name={name} />}
      {type === "ceremony" && <Ceremony name={name} />}
      {type === "not-attending" && <NotAttending name={name} />}
    </Html>
  );
};

const Reception = ({ name }: Omit<ConfirmRSVP, "type">) => (
  <>
    <Head />
    <Preview>Welcome to our wedding! (Reception)</Preview>
    <Tailwind>
      <Body className="my-auto mx-auto bg-white font-sans">
        <Container className="my-[40px] mx-auto w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Img
            className="mx-auto"
            src="https://tinandrew.vercel.app/_next/image?url=%2Fhero-kittens.png&w=384&q=75"
          />
          <Heading className="my-[30px] mx-0 p-0 text-center text-[24px] font-normal text-black">
            {`Thanks for the response, ${name?.split(" ")[0]}! `}
          </Heading>
          <Text className="text-[14px] leading-[24px] text-black">
            {`Keep this email for reference. It will let you update your response on Andrew & Tina's `}
            <Link href={`https://andrewtina.com/schedule?person=${name}`}>
              {` website`}
            </Link>
          </Text>
          <Container>
            <Text className="text-xl font-bold">{`Ceremony`}</Text>
            <Text className="leading-none">{`Date: 4th November, 2023`}</Text>
            <Text className="leading-none">{`Time: 12:45pm - 2:30pm.`}</Text>
            <Text className="leading-snug">
              {`Location: `}
              <Link href="https://goo.gl/maps/uLHcivFBcfzuVr8f7">
                {`St John’s Anglican Cathedral, 195 Church St, Parramatta NSW 2150`}
              </Link>
            </Text>
            <Text className="text-sm">{`Dress Code: Formal`}</Text>
            <Text>
              {`Instructions: Please be seated by 12:45 for a 1pm start.`}
            </Text>
          </Container>
          <Container>
            <Text className="text-xl font-bold leading-none">{`Reception`}</Text>
            <Text className="leading-none">{`Date: 4th November, 2023`}</Text>
            <Text className="leading-none">{`Time: 6:30pm - 12am `}</Text>
            <Text className="leading-none">
              {`Location: `}
              <Link href="https://goo.gl/maps/gpmucNuKX7BZ8d9Y6">
                {`45-47 Rawson St, Epping NSW 2121`}
              </Link>
            </Text>
            <Text>{`Dress Code: Formal`}</Text>
          </Container>
          <Container>
            <Text className="mb-0 whitespace-pre-line text-center leading-snug">
              {`We're excited to see you for our special day! \nSincerely, Andrew and Tina`}
            </Text>
          </Container>
        </Container>
      </Body>
    </Tailwind>
  </>
);

const Ceremony = ({ name }: Omit<ConfirmRSVP, "type">) => (
  <>
    <Head />
    <Preview>Welcome to our wedding!</Preview>
    <Tailwind>
      <Body className="my-auto mx-auto bg-white font-sans">
        <Container className="my-[40px] mx-auto w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Img
            className="mx-auto"
            src="https://tinandrew.vercel.app/_next/image?url=%2Fhero-kittens.png&w=384&q=75"
          />

          <Heading className="my-[30px] mx-0 p-0 text-center text-[24px] font-normal text-black">
            {` Thanks for the response, ${name?.split(" ")[0]}! `}
          </Heading>

          <Text className="text-[14px] leading-[24px] text-black">
            {`Keep this email for reference. It will let you update your response on Andrew & Tina's `}
            <Link href={`https://andrewtina.com/schedule?person=${name}`}>
              {` website`}
            </Link>
          </Text>

          <Container>
            <Text className="text-xl font-bold">{`Ceremony`}</Text>
            <Text className="leading-none">{`Date: 4th November, 2023`}</Text>
            <Text className="leading-none">{`Time: 12:45pm - 2:30pm.`}</Text>
            <Text className="leading-none">
              {`Location: `}
              <Link href="https://goo.gl/maps/uLHcivFBcfzuVr8f7">
                {`St John’s Anglican Cathedral, 195 Church St, Parramatta NSW 2150`}
              </Link>
            </Text>
            <Text className="text-sm">{`Dress Code: Formal`}</Text>
            <Text>
              {`Instructions: Please be seated by 12:45 for a 1pm start.`}
            </Text>
          </Container>
          <Container>
            <Text className="mb-0 whitespace-pre-line text-center leading-snug">
              {`We're excited to see you for our special day! \nSincerely, Andrew and Tina`}
            </Text>
          </Container>
        </Container>
      </Body>
    </Tailwind>
  </>
);

const NotAttending = ({ name }: Omit<ConfirmRSVP, "type">) => (
  <>
    <Head />
    <Preview>Welcome to our wedding! (Reception)</Preview>
    <Tailwind>
      <Body className="my-auto mx-auto bg-white font-sans">
        <Container className="my-[40px] mx-auto w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
          <Img
            className="mx-auto"
            src="https://tinandrew.vercel.app/_next/image?url=%2Fhero-kittens.png&w=384&q=75"
          />

          <Heading className="my-[30px] mx-0 p-0 text-center text-[24px] font-normal text-black">
            {` Thanks for the response, ${name?.split(" ")[0]}! `}
          </Heading>

          <Text className="text-[14px] leading-[24px] text-black">
            {`Keep this email for reference. It will let you update your response on Andrew & Tina's `}
            <Link href={`https://andrewtina.com/schedule?person=${name}`}>
              {` website`}
            </Link>
          </Text>

          <Container>
            <Text className="mb-0 whitespace-pre-line text-center leading-snug">
              {`We're sorry to hear that you can't come, but let us know if you change your mind!\nSincerely, Andrew and Tina`}
            </Text>
          </Container>
        </Container>
      </Body>
    </Tailwind>
    /
  </>
);

export default ConfirmRSVP;
