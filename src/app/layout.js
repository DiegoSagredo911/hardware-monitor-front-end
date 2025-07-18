import "./globals.css";

export const metadata = {
  title: "HardwareMonitor",
  description: "by Diego Sagredo Ailef",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
