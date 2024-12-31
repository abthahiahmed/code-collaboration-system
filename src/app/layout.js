import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextauthProvider from "@/components/session-provider";
import { getSession } from "@/lib/auth";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Code Collabration System",
  description: "Code Collabration System",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <NextauthProvider session={session}>{children}</NextauthProvider> 
      </body>
    </html>
  );
}
