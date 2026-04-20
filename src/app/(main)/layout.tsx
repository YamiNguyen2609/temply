import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DataProvider } from "@/providers/DataProvider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataProvider>
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </DataProvider>
  );
}
