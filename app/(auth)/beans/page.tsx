"use client";

import { useEffect } from "react";
import PageTitle from "@/components/common/pageTitle";
import Container from "@/components/common/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useBeansStore } from "@/lib/store/beansStore";

interface Bean {
  id: number;
  name: string;
  roaster: string;
  origin: string;
  roastDate: string;
  startingWeight: number;
  currentWeight: number;
}

const BeansPage = () => {
  const { beans, fetchBeans } = useBeansStore();

  useEffect(() => {
    fetchBeans();
  }, [fetchBeans]);

  return (
    <Container className="pb-12">
      <PageTitle title="Beans" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {beans.map((bean: Bean) => (
          <Link href={`/beans/${bean.id}`} key={bean.id}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>{bean.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Roaster: {bean.roaster}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Origin: {bean.origin}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Roast Date: {new Date(bean.roastDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Current Weight: {bean.currentWeight}g
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default BeansPage;
