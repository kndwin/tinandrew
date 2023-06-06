import Image from "next/image";

export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="my-16 flex flex-col items-center justify-center">
      <p className="font-gistesy text-5xl text-brown ">{title}</p>
      <Image
        src="/timeline-flowers.png"
        className="w-24"
        height={800}
        width={500}
        alt="Flower"
      />
    </div>
  );
};
