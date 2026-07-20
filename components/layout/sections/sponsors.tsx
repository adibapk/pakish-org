"use client";

import { Marquee } from "@devnomic/marquee";
import Image from "next/image";

interface SponsorPartner {
  name: string;
  logoSrc: string;
}

const partners: SponsorPartner[] = [
  {
    name: "Pakish Group — Est. 1999",
    logoSrc: "/sponsors/pakish-group.svg",
  },
  {
    name: "Pakish.NET",
    logoSrc: "/sponsors/pakish-net.svg",
  },
  {
    name: "Pakish.ORG",
    logoSrc: "/sponsors/pakish-org.svg",
  },
  {
    name: "Fi Sabilillah Initiative",
    logoSrc: "/sponsors/fi-sabilillah.svg",
  },
  {
    name: "Korangi Campus, Karachi",
    logoSrc: "/sponsors/korangi-campus.svg",
  },
  {
    name: "Lodhran Campus, Dunyapur",
    logoSrc: "/sponsors/lodhran-campus.svg",
  },
];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[90%] md:max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Our Partners &amp; Ecosystem
      </h2>

      <div className="mx-auto overflow-hidden">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {partners.map(({ name, logoSrc }) => (
            <div
              key={name}
              className="flex items-center shrink-0"
              title={name}
            >
              <Image
                src={logoSrc}
                alt={name}
                width={200}
                height={48}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
