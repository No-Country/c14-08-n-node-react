import "@/styles/globals.css";
import { Nav, Footer } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LegalHub",
  description: "Encontrá los mejores abogados cerca tuyo",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-100">
          <Nav />
          <main>{children}</main>
          <div className="mt-auto ">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
