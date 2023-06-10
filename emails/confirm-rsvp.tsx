import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

type ConfirmRSVP = {
  name?: string;
};

export const ConfirmRSVP = ({ name }: ConfirmRSVP) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our wedding!</Preview>
      <Tailwind>
        <Body className="my-auto mx-auto bg-white font-sans">
          <Container className="my-[40px] mx-auto w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="my-[30px] mx-0 p-0 text-center text-[24px] font-normal text-black">
              Thanks you {name} for RSVPing!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {name},
            </Text>
            <Hr className="my-[26px] mx-0 w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Sent with love
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmRSVP;
