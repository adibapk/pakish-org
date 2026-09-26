"use client";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ToggleTheme } from "./toogle-theme";
import { cn } from "@/lib/utils";
import { ACADEMY_LOGIN_URL } from "@/lib/academy";
import {
  DESKTOP_PRIMARY_LINKS,
  getCourseNavItems,
  isNavActive,
  MOBILE_SUPPORT_LINKS,
  resolveNavHref,
  TRAINING_LINKS,
} from "@/lib/navigation/site-nav";

const courseNavItems = getCourseNavItems();

const navTriggerClass =
  "h-9 shrink-0 bg-card px-3 text-sm font-medium motion-reduce:transition-none";
const navLinkClass =
  "h-9 shrink-0 bg-card px-3 text-sm font-medium motion-reduce:transition-none";

function DropdownLink({
  href,
  title,
  description,
  onNavigate,
}: {
  href: string;
  title: string;
  description: string;
  onNavigate?: () => void;
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        onClick={onNavigate}
        className="block rounded-md p-2.5 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <p className="mb-0.5 font-medium leading-none text-foreground">{title}</p>
        <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>
      </Link>
    </NavigationMenuLink>
  );
}

function MobileNavLink({
  href,
  label,
  pathname,
  external,
  onNavigate,
  active,
}: {
  href: string;
  label: string;
  pathname: string;
  external?: boolean;
  onNavigate: () => void;
  active?: boolean;
}) {
  const resolved = external ? href : resolveNavHref(href, pathname);
  return (
    <Button
      onClick={onNavigate}
      asChild
      variant="ghost"
      className={cn(
        "h-11 justify-start text-base font-normal",
        active && "bg-accent text-accent-foreground"
      )}
    >
      <Link
        href={resolved}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-current={active ? "page" : undefined}
      >
        {label}
        {external ? " ↗" : ""}
      </Link>
    </Button>
  );
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const closeMenu = React.useCallback(() => setIsOpen(false), []);

  return (
    <header
      data-testid="site-header"
      className="relative z-50 mx-auto top-5 sticky w-full max-w-screen-2xl rounded-2xl border border-secondary bg-card px-2 py-2 shadow-inner sm:w-[96%]"
    >
      <div className="flex min-h-14 items-center justify-between gap-2">
        <BrandLogo href="/" className="shrink-0" imageClassName="h-10 sm:h-11" />

        <NavigationMenu
          className="hidden lg:flex mx-2 min-w-0 flex-1 justify-center static"
          delayDuration={0}
        >
          <NavigationMenuList className="flex-nowrap gap-0.5">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTriggerClass}>
                Courses
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[min(100vw-2rem,36rem)] grid-cols-1 gap-0.5 p-3 sm:grid-cols-2">
                  <li className="sm:col-span-2">
                    <DropdownLink
                      href="/courses"
                      title="View All Courses"
                      description="Browse AI, web, cloud and digital skills programs."
                    />
                  </li>
                  {courseNavItems.map(({ href, title, description }) => (
                    <li key={href}>
                      <DropdownLink
                        href={href}
                        title={title}
                        description={description}
                      />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navTriggerClass}>
                Training
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-[min(100vw-2rem,20rem)] flex-col gap-0.5 p-3">
                  {TRAINING_LINKS.map(({ href, label, description }) => (
                    <li key={href}>
                      <DropdownLink
                        href={resolveNavHref(href, pathname)}
                        title={label}
                        description={description ?? ""}
                      />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {DESKTOP_PRIMARY_LINKS.map(({ href, label, external }) => {
              const resolved = external ? href : resolveNavHref(href, pathname);
              const active = isNavActive(href, pathname);
              return (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={resolved}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        navLinkClass,
                        active && "bg-accent text-accent-foreground"
                      )}
                      aria-current={active ? "page" : undefined}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button asChild size="sm" className="h-9 px-3 text-sm font-semibold">
            <Link href="/admission">Apply</Link>
          </Button>
          <ToggleTheme />
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10"
                  aria-label="Open menu"
                  data-testid="mobile-menu-trigger"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex w-[min(100vw,24rem)] flex-col justify-between border-secondary bg-card"
              >
                <div className="overflow-y-auto">
                  <SheetHeader className="mb-4 text-left">
                    <SheetTitle>
                      <BrandLogo href="/" onClick={closeMenu} />
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col gap-4 px-1" aria-label="Mobile">
                    <section>
                      <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Learn
                      </p>
                      <div className="flex flex-col">
                        <MobileNavLink
                          href="/courses"
                          label="View All Courses"
                          pathname={pathname}
                          onNavigate={closeMenu}
                          active={pathname === "/courses"}
                        />
                        {courseNavItems.map(({ href, title }) => (
                          <MobileNavLink
                            key={href}
                            href={href}
                            label={title}
                            pathname={pathname}
                            onNavigate={closeMenu}
                            active={pathname === href}
                          />
                        ))}
                        <MobileNavLink
                          href="/#learning-options"
                          label="Training Options"
                          pathname={pathname}
                          onNavigate={closeMenu}
                        />
                        {TRAINING_LINKS.map(({ href, label }) => (
                          <MobileNavLink
                            key={href}
                            href={href}
                            label={label}
                            pathname={pathname}
                            onNavigate={closeMenu}
                            active={isNavActive(href, pathname)}
                          />
                        ))}
                      </div>
                    </section>

                    <Separator />

                    <section>
                      <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Community
                      </p>
                      <div className="flex flex-col">
                        <MobileNavLink
                          href="/womens-empowerment"
                          label="Women's Empowerment"
                          pathname={pathname}
                          onNavigate={closeMenu}
                          active={pathname.startsWith("/womens-empowerment")}
                        />
                        <MobileNavLink
                          href="/insights"
                          label="Insights"
                          pathname={pathname}
                          onNavigate={closeMenu}
                          active={pathname.startsWith("/insights")}
                        />
                      </div>
                    </section>

                    <Separator />

                    <section>
                      <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Student Access
                      </p>
                      <MobileNavLink
                        href={ACADEMY_LOGIN_URL}
                        label="Academy Login"
                        pathname={pathname}
                        external
                        onNavigate={closeMenu}
                      />
                    </section>

                    <Separator />

                    <section>
                      <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Admissions &amp; Support
                      </p>
                      <div className="flex flex-col">
                        {MOBILE_SUPPORT_LINKS.map(({ href, label }) => (
                          <MobileNavLink
                            key={href}
                            href={href}
                            label={label}
                            pathname={pathname}
                            onNavigate={closeMenu}
                            active={isNavActive(href, pathname)}
                          />
                        ))}
                      </div>
                    </section>
                  </nav>
                </div>

                <SheetFooter className="flex-col items-start border-t border-secondary pt-4 sm:flex-col">
                  <ToggleTheme />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
