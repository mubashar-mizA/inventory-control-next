import "./globals.css";

import SessionWraper from "./components/SessionWraper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <SessionWraper>{children}</SessionWraper>
      </body>
    </html>
  );
}
