import "./styles/globals.css";

export const metadata = {
  title: "Mikolaj Marciniak",
  description: "Freelance full stack developer for hire,  ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
