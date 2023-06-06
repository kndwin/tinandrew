export const AddToCalendar = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="mt-8 text-center font-cardo text-3xl text-lightbrown">
        Saturday November 4th, 2023
      </p>
      <button
        className="mt-2 rounded-full border border-lightbrown bg-white px-3 py-1 text-xs text-lightbrown"
        onClick={() => {
          const event = {
            title: "Wedding",
            description: "Andrew + Tina",
            location: "Melbourne, Australia",
            start: "2023-11-04T17:00:00+11:00",
            end: "2023-11-04T23:00:00+11:00",
          };
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
