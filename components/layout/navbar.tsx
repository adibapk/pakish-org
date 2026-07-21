"use client";
import { ChevronsDown, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { ToggleTheme } from "./toogle-theme";
import { cn } from "@/lib/utils";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

interface CampusLinkProps {
  href: string;
  label: string;
  description: string;
}

const campusLinks: CampusLinkProps[] = [
  {
    href: "/campus/korangi",
    label: "Karachi",
    description: "Korangi Zaman Town campus — IT & AI training in Karachi.",
  },
  {
    href: "/campus/lodhran",
    label: "Lodhran",
    description: "Chak No. 319, Dunyapur — empowering South Punjab.",
  },
];

const routeList: RouteProps[] = [
  { href: "/insights", label: "Insights" },
  { href: "#courses", label: "Courses" },
  { href: "#benefits", label: "Mission" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

const featureList: FeatureProps[] = [
  {
    title: "1-Month Fast-Track",
    description:
      "Freelancing, Canva, and ChatGPT — start earning through micro-tasks quickly.",
  },
  {
    title: "3-Month Advanced",
    description:
      "WordPress, SMM, SEO, and prompt engineering for digital marketing careers.",
  },
  {
    title: "6-Month Pro Developer",
    description:
      "Next.js, AI integration, and high-ticket global freelancing skills.",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  return (
    <header className="relative z-50 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary rounded-2xl bg-card shadow-inner">
      <div className="flex items-center justify-between gap-2 p-2">
        <Link href="/" className="font-bold text-lg flex items-center shrink-0">
          <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
          <span className="hidden sm:inline">Pakish.ORG</span>
        </Link>

        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
            >
              <div>
                <SheetHeader className="mb-4 ml-4">
                  <SheetTitle className="flex items-center">
                    <Link
                      href="/"
                      className="flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                      Pakish.ORG
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  <p className="px-4 text-sm font-semibold text-muted-foreground">
                    Campuses
                  </p>
                  {campusLinks.map(({ href, label }) => (
                    <Button
                      key={href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="ghost"
                      className="justify-start text-base"
                    >
                      <Link href={href}>{label}</Link>
                    </Button>
                  ))}

                  <Separator className="my-2" />

                  {routeList.map(({ href, label }) => (
                    <Button
                      key={href}
                      onClick={() => setIsOpen(false)}
                      asChild
                      variant="ghost"
                      className="justify-start text-base"
                    >
                      <Link href={resolveHref(href)}>{label}</Link>
                    </Button>
                  ))}
                </div>
              </div>

              <SheetFooter className="flex-col sm:flex-col justify-start items-start">
                <Separator className="mb-2" />
                <ToggleTheme />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <NavigationMenu className="hidden lg:flex mx-auto max-w-fit flex-none static">
          <NavigationMenuList className="flex-wrap justify-center gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-card text-base">
                Courses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-[400px] flex-col gap-1 p-4">
                  {featureList.map(({ title, description }) => (
                    <li key={title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={resolveHref("#courses")}
                          className="block rounded-md p-3 text-sm hover:bg-muted"
                        >
                          <p className="mb-1 font-semibold leading-none text-foreground">
                            {title}
                          </p>
                          <p className="line-clamp-2 text-muted-foreground">
                            {description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-card text-base">
                Campuses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-[320px] flex-col gap-1 p-4">
                  {campusLinks.map(({ href, label, description }) => (
                    <li key={href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={href}
                          className="block rounded-md p-3 text-sm hover:bg-muted"
                        >
                          <p className="mb-1 font-semibold leading-none text-foreground">
                            {label}
                          </p>
                          <p className="line-clamp-2 text-muted-foreground">
                            {description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {routeList
              .filter(({ href }) => href !== "#courses")
              .map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={resolveHref(href)}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-card text-base"
                      )}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex shrink-0">
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};
