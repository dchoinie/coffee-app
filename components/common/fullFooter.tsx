"use client";

import Container from "./container";
import {
  fullNavItems,
  limitedFooterItems,
  socialLinks,
} from "@/data/navigation";
import Link from "next/link";

const FullFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50">
      <Container>
        <div className="flex justify-between py-12">
          {/* Column 1: Logo and Contact Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Coffee App</h2>
            <p className="text-gray-600">
              Your perfect companion for brewing the best coffee at home.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">Email: contact@coffeeapp.com</p>
              <p className="text-gray-600">Phone: (555) 123-4567</p>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.link}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Main Navigation */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              {fullNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Footer Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              {limitedFooterItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t py-6 text-center text-gray-600">
          <p>© {currentYear} Coffee App. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default FullFooter;
