import "./styles/globals.css";

export const metadata = {
  title: "Mikolaj Marciniak",
  description: "Freelance full stack developer for hire, ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
