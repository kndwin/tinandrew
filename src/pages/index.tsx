import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { RegoForm } from "~/modules/rego";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Andrew + Tina's wedding`}</title>
        <meta name="description" content="Andrew and Tina's wedding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-w-screen flex h-full min-h-screen flex-1 items-center justify-center bg-[#FCF9F8]">
        <RegoForm />
        <Image
          alt="decorative branches"
          src="/branches-a.svg"
          height={500}
          width={500}
          className="absolute bottom-0 left-0 -z-0"
        />
        <Image
          alt="decorative branches"
          src="/branches-b.svg"
          height={500}
          width={500}
          className="absolute top-0 right-0 -z-0"
        />
      </div>
    </>
  );
};

export default Home;
