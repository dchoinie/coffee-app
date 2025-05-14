import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";

export type SubNavItem = {
  label: string;
  link: string;
  subItems?: SubNavItem[];
};

export type NavItem = {
  label: string;
  link: string;
  subItems?: SubNavItem[];
};

export type SocialLink = {
  label?: string;
  link: string;
  icon: React.ReactNode;
};

export const limitedNavItems = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Features",
    link: "/features",
  },
  {
    label: "Pricing",
    link: "/pricing",
  },
  {
    label: "Recipes",
    link: "/recipes",
  },
];

export const fullNavItems: NavItem[] = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Brews",
    link: "/brews",
  },
  {
    label: "Beans",
    link: "/beans",
  },
  {
    label: "Analytics",
    link: "/analytics",
  },
  {
    label: "Recipes",
    link: "/recipes",
  },
  {
    label: "Groups",
    link: "/groups",
  },
  {
    label: "Settings",
    link: "/settings",
  },
  {
    label: "Upgrade to Pro",
    link: "/upgrade",
  },
];

export const limitedFooterItems = [
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Contact",
    link: "/contact",
  },
  {
    label: "Terms & Conditions",
    link: "/terms",
  },
  {
    label: "Privacy Policy",
    link: "/privacy",
  },
  {
    label: "Support",
    link: "/support",
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Twitter",
    link: "https://twitter.com/coffee_app",
    icon: <TwitterIcon />,
  },
  {
    label: "Instagram",
    link: "https://www.instagram.com/coffee_app",
    icon: <InstagramIcon />,
  },
  {
    label: "Facebook",
    link: "https://www.facebook.com/coffee_app",
    icon: <FacebookIcon />,
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/company/coffee_app",
    icon: <LinkedinIcon />,
  },
];
