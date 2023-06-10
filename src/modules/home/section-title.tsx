import Image from "next/image";
import { Text } from "~/ui/text";

export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="my-16 flex flex-col items-center justify-center">
      <Text size="display">{title}</Text>
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
