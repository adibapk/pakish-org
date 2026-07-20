import Image from "next/image";

interface GlimpseImage {
  src: string;
  alt: string;
}

const glimpseImages: GlimpseImage[] = [
  {
    src: "/gallary/event-image-2.jpg",
    alt: "Pakish.ORG community event empowering women in technology",
  },
  {
    src: "/gallary/event-image4.jpg",
    alt: "Pakish.ORG training session for women in IT and AI",
  },
  {
    src: "/gallary/pakish event images.png",
    alt: "Pakish.ORG workspace and women empowerment IT program",
  },
  {
    src: "/gallary/pakish-event-images-2.png",
    alt: "Pakish.ORG campus event celebrating women in tech",
  },
  {
    src: "/gallary/pakish-event-images-3.webp",
    alt: "Pakish.ORG dedicated IT training workspace for women",
  },
  {
    src: "/gallary/pakish-event-images-4-karachi-pakistan.png",
    alt: "Pakish.ORG Karachi campus workspace for women's IT education",
  },
];

export const GlimpsesSection = () => {
  return (
    <section id="glimpses" className="container py-24 sm:py-32">
      <div className="text-center mb-10">
        <h2 className="text-lg text-primary mb-2 tracking-wider">Gallery</h2>
        <h2 className="text-3xl md:text-4xl font-bold">Pakish Glimpses</h2>
        <p className="md:w-2/3 mx-auto text-xl text-muted-foreground mt-4">
          A look inside our dedicated workspaces and empowering community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {glimpseImages.map(({ src, alt }) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-secondary bg-muted/40 shadow-sm"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
