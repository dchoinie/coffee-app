import LimitedNav from "@/components/common/limitedNav";
import LimitedFooter from "@/components/common/limitedFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LimitedNav />
      <main>{children}</main>
      <LimitedFooter />
    </>
  );
}
