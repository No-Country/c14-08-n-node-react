import "@/styles/globals.css";
import { Nav, Footer } from "@/components";
import type { Metadata } from "next";
import { useStore } from "@/store/store";
//import {LocalizationProvider, AdapterDayjs}  from '../constants/themeProvider'
import AuthProvider from "./AuthProvider";
import "react-day-picker/dist/style.css";

export const metadata: Metadata = {
  title: "LegalHub",
  description: "Encontrá los mejores abogados cerca tuyo",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="min-h-screen">
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
          <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-100">
            <Nav />
            <main>{children}</main>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
          {/* </LocalizationProvider> */}
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
