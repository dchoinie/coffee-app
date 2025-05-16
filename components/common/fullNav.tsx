"use client";

import { fullNavItems, NavItem } from "@/data/navigation";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import Container from "./container";
import { Button } from "../ui/button";

const FullNav = () => {
  const { isLoaded } = useUser();
  const { user } = useUser();

  return (
    <nav className="w-full border-b">
      <Container>
        <div className="flex justify-between py-4">
          {/* Logo */}
          <div className="flex">
            <Link href={user ? "/dashboard" : "/"}>
              <h1 className="text-3xl font-bold">Coffee App</h1>
            </Link>
          </div>

          {/* Navigation Items */}
          <NavigationMenu>
            <NavigationMenuList>
              {fullNavItems.map((item: NavItem, index: number) => (
                <NavigationMenuItem key={item.label}>
                  {index === fullNavItems.length - 1 ? (
                    <Button asChild variant="default">
                      <Link href={item.link}>{item.label}</Link>
                    </Button>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href={item.link} className="px-4 py-2">
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isLoaded && <UserButton />}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default FullNav;
