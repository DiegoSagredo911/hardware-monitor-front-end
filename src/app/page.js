"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Bienvenido a Hardware Monitor</h1>
      <h2 className="text-xl mb-4">Desarrollado por Diego Sagredo Ailef</h2>
      <p className="mb-4">
        Esta aplicación te permite monitorear el hardware de tus PCs en tiempo
        real.
      </p>
      <Link
        href="/PC"
        className="px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
      >
        Ir a PCs
      </Link>
    </main>
  );
}
