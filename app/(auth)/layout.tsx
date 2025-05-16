import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FullNav from "@/components/common/fullNav";
import FullFooter from "@/components/common/fullFooter";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <FullNav />
      <main>{children}</main>
      <FullFooter />
    </>
  );
}
