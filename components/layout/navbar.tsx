"use client";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Menu } from "lucide-react";
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
import { ACADEMY_LOGIN_URL } from "@/lib/academy";
import { getAllCourses } from "@/lib/courses";

interface RouteProps {
  href: string;
  label: string;
}

interface CampusLinkProps {
  href: string;
  label: string;
  description: string;
}

const campusLinks: CampusLinkProps[] = [
  {
    href: "/campus/gulshan-e-iqbal",
    label: "Karachi",
    description: "Gulshan-e-Iqbal, Main University Road — IT & AI training in Karachi.",
  },
];

const routeList: RouteProps[] = [
  { href: "/courses", label: "Courses" },
  { href: "#learning-options", label: "Training Options" },
  { href: "/womens-empowerment", label: "Women's Empowerment" },
  { href: "/insights", label: "Insights" },
  { href: "/payment-methods", label: "Payment Methods" },
  { href: ACADEMY_LOGIN_URL, label: "Academy Login" },
  { href: "#faq", label: "FAQ" },
];

const courseNavItems = getAllCourses().map((course) => ({
  href: `/courses/${course.slug}`,
  title: course.shortTitle,
  description: course.summary,
}));

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const resolveHref = (href: string) => {
    if (href.startsWith("/")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  return (
    <header className="relative z-50 w-[90%] md:w-[70%] xl:w-[75%] xl:max-w-screen-xl top-5 mx-auto sticky border border-secondary rounded-2xl bg-card shadow-inner">
      <div className="flex items-center justify-between gap-2 p-2">
        <BrandLogo
          href="/"
          className="shrink-0"
          imageClassName="h-8 sm:h-9"
        />

        <div className="flex items-center xl:hidden">
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
                  <SheetTitle>
                    <BrandLogo
                      href="/"
                      onClick={() => setIsOpen(false)}
                    />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => setIsOpen(false)}
                    asChild
                    className="mx-4 mb-2"
                  >
                    <Link href="/admission">Apply for Admission</Link>
                  </Button>
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
                      <Link
                        href={href.startsWith("http") ? href : resolveHref(href)}
                        {...(href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {label}
                      </Link>
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

        <NavigationMenu className="hidden xl:flex mx-auto max-w-fit flex-none static">
          <NavigationMenuList className="flex-wrap justify-center gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-card text-base">
                Courses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-[420px] flex-col gap-1 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/courses"
                        className="block rounded-md p-3 text-sm hover:bg-muted"
                      >
                        <p className="mb-1 font-semibold leading-none text-foreground">
                          All Courses
                        </p>
                        <p className="line-clamp-2 text-muted-foreground">
                          Browse AI, web, cloud and digital skills programs.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {courseNavItems.map(({ href, title, description }) => (
                    <li key={href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={href}
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
              .filter(({ href }) => href !== "/courses")
              .map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href.startsWith("http") ? href : resolveHref(href)}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-card text-base"
                      )}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden xl:flex shrink-0">
          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link href="/admission">Apply</Link>
            </Button>
            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
};
