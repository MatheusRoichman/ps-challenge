import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import styles from "./layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yelp Restaurants",
  description: "Discover restaurants near you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.content}>{children}</div>
      </body>
    </html>
  );
}
