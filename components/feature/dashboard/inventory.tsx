"use client";

import { useEffect, useState } from "react";
import { useBeansStore } from "@/lib/store/beansStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Inventory() {
  const {
    beans,
    currentPage,
    itemsPerPage,
    totalPages,
    isLoading,
    error,
    fetchBeans,
    setPage,
  } = useBeansStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchBeans();
  }, [fetchBeans]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBeans = beans.slice(startIndex, endIndex);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-[200px] mt-4 bg-gray-200 animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-[200px] mt-4 bg-gray-200 animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {currentBeans.map((bean) => (
          <Card key={bean.id}>
            <CardHeader>
              <CardTitle className="font-display text-2xl font-bold">
                {bean.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Roaster:</strong> {bean.roaster}
                </p>
                <p>
                  <strong>Origin:</strong> {bean.origin}
                </p>
                <p>
                  <strong>Roast Date:</strong>{" "}
                  {mounted
                    ? new Date(bean.roastDate).toLocaleDateString()
                    : bean.roastDate}
                </p>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Starting Weight",
                          weight: bean.startingWeight,
                          fill: "#8B4513",
                        },
                        {
                          name: "Current Weight",
                          weight: bean.currentWeight,
                          fill: "#DEB887",
                        },
                      ]}
                      margin={{ top: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#D2B48C" />
                      <XAxis dataKey="name" stroke="#8B4513" />
                      <YAxis stroke="#8B4513" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFF8DC",
                          border: "1px solid #8B4513",
                        }}
                      />
                      <Bar
                        dataKey="weight"
                        fill="#8884d8"
                        label={{
                          position: "top",
                          fill: "#8B4513",
                          fontSize: 12,
                          formatter: (value: number) => `${value}g`,
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="py-2 px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <div className="mt-4 flex justify-center">
        <Button asChild className="bg-[#8B4513] hover:bg-[#6B3410] text-white">
          <Link href="/beans">View Full Inventory</Link>
        </Button>
      </div>
    </div>
  );
}
