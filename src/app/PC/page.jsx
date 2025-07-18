"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Pc = () => {
  // Estado para almacenar los datos de los PCs
  const [data, setData] = useState([]);
  // Hook para la navegación programática
  const { push } = useRouter();

  // Función para obtener los datos desde la API
  const getData = async () => {
    try {
      // Realiza la petición GET a la API
      const response = await axios.get(
        process.env.NEXT_PUBLIC_URL + "/api/hardware"
      );
      // Actualiza el estado con los datos recibidos
      setData(response.data);
    } catch (error) {
      // Muestra un error en consola si la petición falla
      console.error("Error fetching data:", error);
    }
  };

  // useEffect para llamar a getData una sola vez al montar el componente
  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      {/* Título principal */}
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Listado de Equipos
      </h1>
      {/* Grid de tarjetas de PCs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((pc) => (
          <div
            key={pc._id}
            className="bg-white cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-orange-500"
            // Al hacer click, navega a la página del PC seleccionado
            onClick={() => push(`/PC/${pc._id}`)}
          >
            {/* Muestra el ID del PC */}
            <h2 className="text-xl font-semibold text-gray-800 truncate">
              🖥️ {pc._id}
            </h2>
            {/* Muestra la cantidad de reportes */}
            <p className="text-gray-500 mt-1">
              Cantidad de reportes: {pc.reports?.length || 0}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Pc;
