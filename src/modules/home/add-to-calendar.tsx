import { button } from "~/ui/button";

const event = {
  title: "💒 Andrew + Tina's Wedding",
  description: "Celebrate the wedding of Andrew and Tina!",
  location:
    "St John's Anglican Cathedral, 195 Church St, Parramatta NSW 2150, Australia",
  start: "20231104T230000Z",
  end: "20231105T010000Z",
};

export const AddToCalendar = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="mt-8 text-center font-cardo text-3xl text-lightbrown">
        Saturday November 4th, 2023
      </p>
      <button
        className={button({
          className: "mt-2 rounded-full px-3 py-1 text-sm",
        })}
        onClick={() => {
          const url = new URL("https://calendar.google.com/calendar/render");
          url.searchParams.set("action", "TEMPLATE");
          url.searchParams.set("text", event.title);
          url.searchParams.set("dates", `${event.start}/${event.end}`);
          url.searchParams.set("details", event.description);
          url.searchParams.set("location", event.location);
          url.searchParams.set("sf", "true");
          url.searchParams.set("output", "xml");

          const calendar = window.open(url.toString());

          calendar?.document?.close();
          calendar?.focus();
        }}
      >
        + Add to calendar
      </button>
    </div>
  );
};
