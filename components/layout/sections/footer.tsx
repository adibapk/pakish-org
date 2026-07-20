import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { href: "/#benefits", label: "Mission" },
  { href: "/#courses", label: "Courses" },
  { href: "/#team", label: "Team" },
  { href: "/#contact", label: "Contact" },
  { href: "/#faq", label: "FAQ" },
];

const socialLinks = [
  { href: "#", label: "Facebook" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "YouTube" },
];

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
          <div className="sm:col-span-2">
            <Link href="/" className="flex font-bold items-center">
              <ChevronsDownIcon className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />
              <h3 className="text-2xl">Pakish.ORG</h3>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Empowering women in tech through free and subsidized IT &amp; AI
              training across Pakistan.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Quick Links</h3>
            {quickLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Contact</h3>
            <a
              href="mailto:info@pakish.org"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              info@pakish.org
            </a>
            <a
              href="https://wa.me/923008222456"
              className="opacity-60 hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              +92 300 8222456
            </a>
            <div className="pt-2">
              <h3 className="font-bold text-lg mb-2">Social</h3>
              {socialLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="block opacity-60 hover:opacity-100 transition-opacity"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section>
          <h3>
            &copy; {new Date().getFullYear()} Pakish.ORG. All rights reserved.
          </h3>
        </section>
      </div>
    </footer>
  );
};
