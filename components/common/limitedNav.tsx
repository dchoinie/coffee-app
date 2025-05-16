"use client";

import { limitedNavItems, NavItem } from "@/data/navigation";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const LimitedNav = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Coffee App</h1>
      </div>

      {/* Navigation Items */}
      <NavigationMenu>
        <NavigationMenuList>
          {limitedNavItems.map((item: NavItem) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <Link href={item.link} className="px-4 py-2">
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth Buttons */}
      <div className="flex items-center gap-4">
        <SignInButton mode="modal">
          <Button variant="ghost" className="cursor-pointer">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="cursor-pointer">Sign Up</Button>
        </SignUpButton>
      </div>
    </nav>
  );
};

export default LimitedNav;
