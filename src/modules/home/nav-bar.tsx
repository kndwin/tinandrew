import { cx } from "class-variance-authority";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<string>();

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = navOptions
        .map((n) => n.id)
        .reverse()
        .find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 10 && rect.bottom > -10;
          }
        });

      setCurrentSection(currentSection);
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cx(
        "fixed z-10 flex w-full items-center justify-between",
        "transition-all duration-300 ease-in-out",
        "px-[24px] md:px-[80px]",
        scrolled ? "h-[80px] bg-[#fcf9f8] shadow" : "h-[120px] bg-white"
      )}
    >
      <p
        className={cx(
          "font-gistesy text-brown transition-all duration-300 ease-in-out",
          scrolled ? "text-[36px]" : "text-[48px]"
        )}
      >{`Andrew + tina`}</p>

      <div className="hidden gap-[24px] transition-all lg:flex lg:gap-[40px]">
        {navOptions.map(({ name, id }) => (
          <a
            key={id}
            onClick={(e) => {
              // scroll to section with 10px offset
              e.preventDefault();
              const element = document.getElementById(id);
              if (element) {
                const rect = element.getBoundingClientRect();
                window.scrollTo({
                  top: rect.top + window.scrollY + (id == "rsvp" ? 0 : 1),
                  behavior: "smooth",
                });
              }
            }}
            className={cx(
              "font-cardo text-brown",
              currentSection === id && "border-b-2 border-brown"
            )}
            href={`#${id}`}
          >
            {name}
          </a>
        ))}
      </div>
      <div>
        <p className="hidden font-cardo text-[32px] font-medium text-lightbrown lg:block">{`4 . 11 . 23`}</p>
      </div>

      <div className="block lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {open && <CloseIcon />}
        {!open && <HamburgerIcon />}
      </button>
      <div
        style={{ left: open ? "0" : "100%" }}
        className={cx(
          "fle fixed top-[80px] left-0 flex h-[calc(100vh_-_80px)] w-screen flex-col gap-10 overflow-x-hidden bg-white p-10 transition-all duration-700"
        )}
      >
        <p className="font-cardo text-[32px] font-medium text-lightbrown lg:block">{`4 . 11 . 23`}</p>

        {navOptions.map(({ name, id }) => (
          <a
            key={id}
            onClick={(e) => {
              // scroll to section with 10px offset
              e.preventDefault();
              const element = document.getElementById(id);
              if (element) {
                const rect = element.getBoundingClientRect();
                window.scrollTo({
                  top: rect.top + window.scrollY + (id == "rsvp" ? 0 : 1),
                  behavior: "smooth",
                });
              }
              setOpen(false);
            }}
            className={cx("font-cardo text-[20px] text-brown")}
            href={`#${id}`}
          >
            {name}
          </a>
        ))}
      </div>
    </>
  );
};

const CloseIcon = () => (
  <svg width={34} height={35} viewBox="0 0 34 35" fill="none">
    <path
      stroke="#594B44"
      strokeLinecap="round"
      strokeWidth={2}
      d="m1 1.5 32 32M33 1.5l-32 32"
    />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="34" height="28" viewBox="0 0 34 28" fill="none">
    <path
      d="M1 1H33"
      stroke="#594B44"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M1 14H33"
      stroke="#594B44"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M1 27H33"
      stroke="#594B44"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const navOptions = [
  {
    name: "RSVP",
    id: "rsvp",
  },
  {
    name: "Schedule",
    id: "schedule",
  },
  {
    name: "Q&A",
    id: "q-and-a",
  },
  {
    name: "Bridal Party",
    id: "bridal-party",
  },
];
