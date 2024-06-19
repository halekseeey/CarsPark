import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Cars catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
