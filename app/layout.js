import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Databae Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#0082F6" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
