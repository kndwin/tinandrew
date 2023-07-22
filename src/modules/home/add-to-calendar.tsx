import { button } from "~/ui/button";

const event = {
  ceremony: {
    title: "💒 Andrew + Tina's Wedding",
    description: "Celebrate the wedding of Andrew and Tina!",
    location:
      "St John's Anglican Cathedral, 195 Church St, Parramatta NSW 2150, Australia",
    start: "20231104T014500Z",
    end: "20231104T033000Z",
  },
  reception: {
    title: "💃🕺 Andrew + Tina's Reception",
    description: "Celebrate the Reception of Andrew and Tina!",
    location: "Epping Club, 45-47 Rawson St, Epping NSW 2121, Australia",
    start: "20231104T074500Z",
    end: "20231104T130000Z",
  },
};

export const AddToCalendar = ({ type }: { type: "ceremony" | "reception" }) => {
  return (
    <button
      className={button({
        className: "rounded-full px-3 py-1 text-sm",
      })}
      onClick={() => {
        const url = new URL("https://calendar.google.com/calendar/render");
        url.searchParams.set("action", "TEMPLATE");
        url.searchParams.set("text", event[type].title);
        url.searchParams.set(
          "dates",
          `${event[type].start}/${event[type].end}`
        );
        url.searchParams.set("details", event[type].description);
        url.searchParams.set("location", event[type].location);
        url.searchParams.set("sf", "true");
        url.searchParams.set("output", "xml");

        const calendar = window.open(url.toString());

        calendar?.document?.close();
        calendar?.focus();
      }}
    >
      + Add to calendar
    </button>
  );
};
