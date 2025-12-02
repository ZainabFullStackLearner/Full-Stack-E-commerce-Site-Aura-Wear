import { Geist, Geist_Mono } from "next/font/google";
import { type Metadata } from "next";
import "./globals.css";
import { Playfair_Display } from 'next/font/google';
import { CartProvider } from "@/app/context/Context";
import Foot from "@/app/components/Foot"
import Navbar from "./components/Navbar";
import Bannner from "./components/Bannner";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ClerkProvider} from '@clerk/nextjs'
// import { SignIn } from "@clerk/nextjs";

const Logo = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraWear",
  description: "Elegant fashion made simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head />
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${Logo.variable} antialiased`}
        >
          <CartProvider>
            <header>
              <Bannner />
              <div className="mt-8">
                <Navbar />
              </div>
            </header>
            {children}
            <ToastContainer />
            <div className="flex justify-center items-center py-10"></div>
            <Foot />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
