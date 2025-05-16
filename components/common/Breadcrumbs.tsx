"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      label:
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href,
    };
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
      <Link href="/" className="hover:text-gray-700">
        <Home className="h-5 w-5" />
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          <span className="text-gray-400">/</span>
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900">{breadcrumb.label}</span>
          ) : (
            <Link href={breadcrumb.href} className="hover:text-gray-700">
              {breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
