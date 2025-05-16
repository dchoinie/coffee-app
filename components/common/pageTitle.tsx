"use client";

import Breadcrumbs from "./Breadcrumbs";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <div className="my-12">
      <Breadcrumbs />
      <h2 className="text-3xl font-bold font-sans">{title}</h2>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default PageTitle;
