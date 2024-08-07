import globalcss from "./globalcss.css"

export const metadata = {
  title: "Terraverde",
  description: "Capstone Project || made by: Daná Kelly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
