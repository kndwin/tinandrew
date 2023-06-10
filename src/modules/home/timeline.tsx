import Image from "next/image";

type Timeline = {
  title: string;
  time: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
};
const timeline = {
  ceremony: {
    title: "Ceremony",
    time: "12:45pm - 2:30pm",
    description:
      "Please arrive and be seated by 12:45pm for a 1:00pm start. Children are welcome.",
    imgSrc: "/timeline-ring.png",
    imgAlt: "Wedding Ring",
  },
  socialHover: {
    title: "Social Hover",
    time: "2:30pm - 4:00pm",
    description:
      "After the ceremony and photos, please join us for light refreshments in the Parish Hall next to the church.",
    imgSrc: "/timeline-cake.png",
    imgAlt: "Wedding Cake",
  },
  reception: {
    title: "Reception",
    time: "7:00pm - 12:00pm",
    description:
      "Please arrive and be seated by 12:45pm for a 1:00pm start. Children are welcome.",
    imgSrc: "/timeline-steak.png",
    imgAlt: "Wedding Steak",
  },
};

const GridItem = (props: Timeline & { align: "left" | "right" }) => (
  <>
    {props.align == "left" && (
      <>
        <Image
          src={props.imgSrc}
          className="w-24 self-center justify-self-end"
          height={100}
          width={100}
          alt={props.imgAlt}
        />
        <div className="p-4 text-left">
          <p className="font-cardo text-xl text-brown">{props.title}</p>
          <p className="font-karla text-lightbrown">{props.time}</p>
          <p className="font-karla text-sm">{props.description}</p>
        </div>
      </>
    )}
    {props.align == "right" && (
      <>
        <div className="p-4 text-right">
          <p className="font-cardo text-xl text-brown">{props.title}</p>
          <p className="font-karla text-lightbrown">{props.time}</p>
          <p className="font-karla text-sm">{props.description}</p>
        </div>
        <Image
          src={props.imgSrc}
          className="w-24 self-center"
          height={100}
          width={100}
          alt={props.imgAlt}
        />
      </>
    )}
  </>
);

const MobileItem = (props: Timeline) => (
  <div className="flex w-full max-w-[30ch] flex-col items-center text-center">
    <Image
      src={props.imgSrc}
      className="w-24 self-center"
      height={100}
      width={100}
      alt={props.imgAlt}
    />
    <p className="font-cardo text-xl text-brown">{props.title}</p>
    <p className="font-karla text-lightbrown">{props.time}</p>
    <p className="font-karla text-sm">{props.description}</p>
  </div>
);

export const Timeline = ({
  version,
}: {
  version: "reception" | "ceremony";
}) => {
  return (
    <div className="my-8 flex flex-col items-center justify-center gap-2">
      <div className="hidden max-w-[70ch] grid-cols-[1fr_2em_1fr] gap-y-4 gap-x-2 sm:grid">
        <div className="col-start-2 col-end-2 row-span-3 row-start-1 my-auto flex h-4/5 flex-col">
          {version === "ceremony" ? (
            <>
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
              <div className="mx-auto h-4/5 w-[3px] bg-brown" />
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
            </>
          ) : (
            <>
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
              <div className="mx-auto h-2/5 w-[3px] bg-brown" />
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
              <div className="mx-auto h-2/5 w-[3px] bg-brown" />
              <div className="mx-auto h-[15px] w-[15px] rounded-full bg-brown" />
            </>
          )}
        </div>
        <GridItem {...timeline["ceremony"]} align="right" />
        <GridItem {...timeline["socialHover"]} align="left" />
        {version === "reception" && (
          <GridItem {...timeline["reception"]} align="right" />
        )}
      </div>
      <div className="flex flex-col gap-4 sm:hidden">
        <MobileItem {...timeline["ceremony"]} />
        <MobileItem {...timeline["socialHover"]} />
        {version === "reception" && <MobileItem {...timeline["reception"]} />}
      </div>
    </div>
  );
};