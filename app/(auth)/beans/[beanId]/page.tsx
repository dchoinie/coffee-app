import React from "react";
import PageTitle from "@/components/common/pageTitle";

interface PageProps {
  params: {
    beanId: string;
  };
}

const BeanPage = ({ params }: PageProps) => {
  return (
    <div>
      <PageTitle title="Bean Details" />
      <h1>Bean Details</h1>
      <p>Viewing details for bean with ID: {params.beanId}</p>
    </div>
  );
};

export default BeanPage;
